import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
import { mapToProfessional, mapToClient, DbService } from '../lib/profileMappers';
import {
  Professional, Client, Contract, Task,
  contracts as initialContracts, tasks as initialTasks
} from '../data/mockData';

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
  addContract: (contract: Contract) => void;
  updateTaskStatus: (taskId: string, status: "todo" | "in-progress" | "done") => void;
  addTask: (task: Task) => void;
  triggerNotification: (title: string, message: string) => void;
  activeNotification: { title: string; message: string } | null;
  clearNotification: () => void;
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

  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeNotification, setActiveNotification] = useState<{ title: string; message: string } | null>(null);

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

  const addContract = useCallback((newContract: Contract) => {
    setContracts((prev) => [newContract, ...prev]);
  }, []);

  const updateTaskStatus = useCallback((taskId: string, status: "todo" | "in-progress" | "done") => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  }, []);

  const addTask = useCallback((newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
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
    addContract,
    updateTaskStatus,
    addTask,
    triggerNotification,
    activeNotification,
    clearNotification,
    logout,
    authChecked,
  }), [
    userRole, currentClient, currentProfessional, allProfessionals, professionalsLoading,
    loadProfessionals, contracts, tasks, addContract, updateTaskStatus, addTask,
    triggerNotification, activeNotification, clearNotification, logout, authChecked,
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
