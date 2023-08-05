import { createContext, useContext, useState, ReactNode } from 'react';

const ViewModelContext = createContext<any>({});

export const useViewModel = () => useContext(ViewModelContext);

export default function ViewModel({ children }: { children: ReactNode }) {
  const [session, setSession] = useState(false);

  const signIn = () => {
    setSession(true);
  };

  const signOut = () => {
    setSession(false);
  };

  return (
    <ViewModelContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </ViewModelContext.Provider>
  );
}
