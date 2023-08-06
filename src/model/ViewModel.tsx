import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Session } from '@supabase/supabase-js';

import { supabase } from '../lib/supabase';

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

  const signInWithGoogle = async () => {
    if (Platform.OS === 'web') {
      supabase.auth.signInWithOAuth({ provider: 'google' });
      return;
    }

    const {
      data: { url },
    } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'slugup://google-auth',
      },
    });

    const result = await WebBrowser.openAuthSessionAsync(
      url!,
      'slugup://google-auth?'
      // { preferEphemeralSession: true }
    );

    if (result.type === 'success') {
      const params = new URLSearchParams(result.url.split('#')[1]);

      supabase.auth.setSession({
        access_token: params.get('access_token')!,
        refresh_token: params.get('refresh_token')!,
      });
    }
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <ViewModelContext.Provider value={{ session, signInWithGoogle, signOut }}>
      {children}
    </ViewModelContext.Provider>
  );
}
