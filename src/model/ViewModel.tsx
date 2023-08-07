import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Session } from '@supabase/supabase-js';

import { supabase } from '../lib/supabase';

const ViewModelContext = createContext<any>({});

export const useViewModel = () => useContext(ViewModelContext);

export default function ViewModel({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setLoadingSession(false);
      })
      .catch((error) => console.log(error.message));

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ViewModelContext.Provider
      value={{
        session,
        loadingSession,
        selectedPost,
        setSelectedPost,
        selectedUser,
        setSelectedUser,
      }}>
      {children}
    </ViewModelContext.Provider>
  );
}

export interface User {
  id: string;
  full_name: string;
  avatar_url: string;
}

export interface Post {
  id: string;
  content: string;
  date: string;
  profiles: User;
}

export interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  date: string;
}
