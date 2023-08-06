import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Session } from '@supabase/supabase-js';

import { supabase } from '../lib/supabase';
import * as AuthRepo from '../repo/auth';

const ViewModelContext = createContext<any>({});

export const useViewModel = () => useContext(ViewModelContext);

export default function ViewModel({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  function signInWithGoogle() {
    AuthRepo.signInWithGoogle();
  }

  function signInWithApple() {
    AuthRepo.signInWithApple();
  }

  function signOut() {
    AuthRepo.signOut();
  }

  return (
    <ViewModelContext.Provider
      value={{ session, signInWithGoogle, signInWithApple, signOut }}>
      {children}
    </ViewModelContext.Provider>
  );
}
