import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Page } from '../types';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifications = 5;

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      sidebarOpen, setSidebarOpen, toggleSidebar,
      searchQuery, setSearchQuery,
      notifications,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
