import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { mapToProfessional, mapToClient } from '../lib/profileMappers';
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

  // Real accountants pulled from Supabase — replaces the old
  // hardcoded mockData.professionals list.
  const [allProfessionals, setAllProfessionals] = useState<Professional[]>([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(true);

  // Whether we've finished checking if someone is already logged in
  // (used to avoid flashing the "guest" view for a split second).
  const [authChecked, setAuthChecked] = useState(false);

  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeNotification, setActiveNotification] = useState<{ title: string; message: string } | null>(null);

  // Pull every registered accountant from Supabase for the Search page.
  const loadProfessionals = async () => {
    setProfessionalsLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'accountant');

    if (!error && data) {
      setAllProfessionals(data.map(mapToProfessional));
    }
    setProfessionalsLoading(false);
  };

  // If the person already has a valid login session (e.g. they
  // refreshed the page, or came back the next day), restore it
  // automatically instead of showing them as a guest.
  const restoreSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
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
        setCurrentProfessional(mapToProfessional(profile));
      } else {
        setUserRole('client');
        setCurrentClient(mapToClient(profile));
      }
    }
    setAuthChecked(true);
  };

  useEffect(() => {
    loadProfessionals();
    restoreSession();

    // Keep the app in sync if the session changes in another tab,
    // or expires.
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
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUserRole('guest');
    setCurrentClient(null);
    setCurrentProfessional(null);
  };

  const addContract = (newContract: Contract) => {
    setContracts((prev) => [newContract, ...prev]);
  };

  const updateTaskStatus = (taskId: string, status: "todo" | "in-progress" | "done") => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const addTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const triggerNotification = (title: string, message: string) => {
    setActiveNotification({ title, message });
  };

  const clearNotification = () => {
    setActiveNotification(null);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentClient,
        setCurrentClient,
        currentProfessional,
        setCurrentProfessional,
        allProfessionals,
        professionalsLoading,
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
      }}
    >
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
