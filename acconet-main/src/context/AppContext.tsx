import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
import { mapToProfessional, mapToClient, DbService } from '../lib/profileMappers';
import { mapToContract, mapToTask, DbContract, DbTask } from '../lib/contractMappers';
import { mapToNotification, markNotificationRead as markNotificationReadDb, markAllNotificationsRead as markAllNotificationsReadDb, AppNotification, DbNotification } from '../lib/notifications';
import { Professional, Client, Contract, Task } from '../data/mockData';

const CONTRACT_PARTY_SELECT = `*,
  client:profiles!contracts_client_id_fkey(id, full_name, company_name, wilaya_id),
  professional:profiles!contracts_professional_id_fkey(id, full_name, specialty, avatar_url)`;

export type UserRole = 'guest' | 'client' | 'professional' | 'admin';

interface AppContextProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentClient: Client | null;
  setCurrentClient: (client: Client | null) => void;
  currentProfessional: Professional | null;
  setCurrentProfessional: (pro: Professional | null) => void;
  allProfessionals: Professional[];
  professionalsLoading: boolean;
  refreshProfessionals: () => Promise<void>;
  contracts: Contract[];
  tasks: Task[];
  contractsLoading: boolean;
  addContract: (input: { professionalId: string; title: string; scopeDescription: string; value: number }) => Promise<{ error: string | null }>;
  updateContractStatus: (contractId: string, status: 'active' | 'declined' | 'completed') => Promise<{ error: string | null }>;
  updateTaskStatus: (taskId: string, status: "todo" | "in-progress" | "done") => Promise<{ error: string | null }>;
  addTask: (input: { contractId: string; title: string; deadline: string; type: Task['type'] }) => Promise<{ error: string | null }>;
  triggerNotification: (title: string, message: string) => void;
  activeNotification: { title: string; message: string } | null;
  clearNotification: () => void;
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentProfessional, setCurrentProfessional] = useState<Professional | null>(null);

  const [allProfessionals, setAllProfessionals] = useState<Professional[]>([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(true);

  const [authChecked, setAuthChecked] = useState(false);

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contractsLoading, setContractsLoading] = useState(false);
  const [activeNotification, setActiveNotification] = useState<{ title: string; message: string } | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Pull every registered accountant, plus every service they've
  // listed, and combine them for the Search page.
  const loadProfessionals = useCallback(async (): Promise<Professional[]> => {
    setProfessionalsLoading(true);

    const { data: profileRows, error: profileErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'accountant');

    if (profileErr || !profileRows) {
      setProfessionalsLoading(false);
      return [];
    }

    let serviceRows: DbService[] = [];
    const ids = profileRows.map((p) => p.id);
    if (ids.length > 0) {
      const { data: svcData } = await supabase
        .from('services')
        .select('*')
        .in('professional_id', ids);
      serviceRows = svcData || [];
    }

    const mapped = profileRows.map((row) =>
      mapToProfessional(row, serviceRows.filter((s) => s.professional_id === row.id))
    );
    setAllProfessionals(mapped);
    setProfessionalsLoading(false);
    return mapped;
  }, []);

  // Takes the in-flight loadProfessionals() promise so that, for
  // professional accounts, we can reuse that already-fetched row
  // instead of firing a second, near-identical profile query.
  const restoreSession = useCallback(async (professionalsPromise: Promise<Professional[]>) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      setAuthChecked(true);
      return;
    }

    const professionals = await professionalsPromise;
    const cachedPro = professionals.find((p) => p.id === session.user.id);
    if (cachedPro) {
      setUserRole('professional');
      setCurrentProfessional(cachedPro);
      setAuthChecked(true);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profile) {
      if (profile.role === 'admin') {
        setUserRole('admin');
      } else if (profile.role === 'accountant') {
        setUserRole('professional');
        const { data: ownServices } = await supabase
          .from('services')
          .select('*')
          .eq('professional_id', profile.id);
        setCurrentProfessional(mapToProfessional(profile, ownServices || []));
      } else {
        setUserRole('client');
        setCurrentClient(mapToClient(profile));
      }
    }
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    const professionalsPromise = loadProfessionals();
    restoreSession(professionalsPromise);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUserRole('guest');
        setCurrentClient(null);
        setCurrentProfessional(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [loadProfessionals, restoreSession]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUserRole('guest');
    setCurrentClient(null);
    setCurrentProfessional(null);
  }, []);

  // Pull every contract the current user is a party to (as client or
  // professional), with the other party's display info embedded in the
  // same query, then every task that hangs off those contracts.
  const loadContractsAndTasks = useCallback(async (userId: string) => {
    setContractsLoading(true);

    const { data: contractRows, error } = await supabase
      .from('contracts')
      .select(CONTRACT_PARTY_SELECT)
      .or(`client_id.eq.${userId},professional_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error || !contractRows) {
      setContracts([]);
      setTasks([]);
      setContractsLoading(false);
      return;
    }

    const mappedContracts = (contractRows as unknown as DbContract[]).map(mapToContract);
    setContracts(mappedContracts);

    const contractIds = mappedContracts.map((c) => c.id);
    if (contractIds.length > 0) {
      const { data: taskRows } = await supabase
        .from('tasks')
        .select('*')
        .in('contract_id', contractIds);
      setTasks(((taskRows as DbTask[]) || []).map(mapToTask));
    } else {
      setTasks([]);
    }

    setContractsLoading(false);
  }, []);

  const currentUserId = currentClient?.id || currentProfessional?.id;

  useEffect(() => {
    if (currentUserId) {
      loadContractsAndTasks(currentUserId);
    } else {
      setContracts([]);
      setTasks([]);
    }
  }, [currentUserId, loadContractsAndTasks]);

  const loadNotifications = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(30);

    setNotifications(((data as DbNotification[]) || []).map(mapToNotification));
  }, []);

  // Load the recent notification list, then subscribe to new ones arriving
  // live (same postgres_changes pattern Messages.tsx uses for chat).
  useEffect(() => {
    if (!currentUserId) {
      setNotifications([]);
      return;
    }

    loadNotifications(currentUserId);

    const channel = supabase
      .channel(`notifications:${currentUserId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${currentUserId}` },
        (payload) => {
          const incoming = mapToNotification(payload.new as DbNotification);
          setNotifications((prev) => (prev.some((n) => n.id === incoming.id) ? prev : [incoming, ...prev]));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, loadNotifications]);

  const markNotificationRead = useCallback(async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await markNotificationReadDb(id);
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    if (!currentUserId) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await markAllNotificationsReadDb(currentUserId);
  }, [currentUserId]);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const addContract = useCallback(async (input: { professionalId: string; title: string; scopeDescription: string; value: number }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not signed in.' };

    const { data, error } = await supabase
      .from('contracts')
      .insert({
        professional_id: input.professionalId,
        client_id: user.id,
        title: input.title,
        scope_description: input.scopeDescription,
        value: input.value,
        status: 'pending',
      })
      .select(CONTRACT_PARTY_SELECT)
      .single();

    if (error || !data) return { error: error?.message || 'Could not create the request.' };

    setContracts((prev) => [mapToContract(data as unknown as DbContract), ...prev]);
    return { error: null };
  }, []);

  const updateContractStatus = useCallback(async (contractId: string, status: 'active' | 'declined' | 'completed') => {
    const { data, error } = await supabase
      .from('contracts')
      .update({ status })
      .eq('id', contractId)
      .select(CONTRACT_PARTY_SELECT)
      .single();

    if (error || !data) return { error: error?.message || 'Could not update the contract.' };

    const updated = mapToContract(data as unknown as DbContract);
    setContracts((prev) => prev.map((c) => (c.id === contractId ? updated : c)));
    return { error: null };
  }, []);

  const updateTaskStatus = useCallback(async (taskId: string, status: "todo" | "in-progress" | "done") => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
      .select()
      .single();

    if (error || !data) return { error: error?.message || 'Could not update the task.' };

    const updated = mapToTask(data as DbTask);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    return { error: null };
  }, []);

  const addTask = useCallback(async (input: { contractId: string; title: string; deadline: string; type: Task['type'] }) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        contract_id: input.contractId,
        title: input.title,
        deadline: input.deadline,
        type: input.type,
        status: 'todo',
      })
      .select()
      .single();

    if (error || !data) return { error: error?.message || 'Could not add the task.' };

    setTasks((prev) => [mapToTask(data as DbTask), ...prev]);
    return { error: null };
  }, []);

  const triggerNotification = useCallback((title: string, message: string) => {
    setActiveNotification({ title, message });
  }, []);

  const clearNotification = useCallback(() => {
    setActiveNotification(null);
  }, []);

  const contextValue = useMemo<AppContextProps>(() => ({
    userRole,
    setUserRole,
    currentClient,
    setCurrentClient,
    currentProfessional,
    setCurrentProfessional,
    allProfessionals,
    professionalsLoading,
    refreshProfessionals: async () => { await loadProfessionals(); },
    contracts,
    tasks,
    contractsLoading,
    addContract,
    updateContractStatus,
    updateTaskStatus,
    addTask,
    triggerNotification,
    activeNotification,
    clearNotification,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    logout,
    authChecked,
  }), [
    userRole, currentClient, currentProfessional, allProfessionals, professionalsLoading,
    loadProfessionals, contracts, tasks, contractsLoading, addContract, updateContractStatus, updateTaskStatus, addTask,
    triggerNotification, activeNotification, clearNotification,
    notifications, unreadNotificationsCount, markNotificationRead, markAllNotificationsRead,
    logout, authChecked,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
