import React, { createContext, useContext, useState } from 'react';
import { 
  Professional, Client, Contract, Task, 
  professionals, clients, contracts as initialContracts, tasks as initialTasks 
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
  contracts: Contract[];
  tasks: Task[];
  addContract: (contract: Contract) => void;
  updateTaskStatus: (taskId: string, status: "todo" | "in-progress" | "done") => void;
  addTask: (task: Task) => void;
  triggerNotification: (title: string, message: string) => void;
  activeNotification: { title: string; message: string } | null;
  clearNotification: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('client'); // Default to client to showcase dashboards right out of the box
  const [currentClient, setCurrentClient] = useState<Client | null>(clients[0]); // Default "Dzair Tech Link"
  const [currentProfessional, setCurrentProfessional] = useState<Professional | null>(professionals[0]); // Default "Sofiane Benamara"
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeNotification, setActiveNotification] = useState<{ title: string; message: string } | null>(null);

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
        allProfessionals: professionals,
        contracts,
        tasks,
        addContract,
        updateTaskStatus,
        addTask,
        triggerNotification,
        activeNotification,
        clearNotification,
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
