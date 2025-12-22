import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  resetAdminMode: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
  };

  const resetAdminMode = () => {
    setIsAdminMode(false);
  };

  return (
    <AdminContext.Provider value={{ isAdminMode, toggleAdminMode, resetAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

