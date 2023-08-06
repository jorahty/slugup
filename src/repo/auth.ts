import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { supabase } from '../lib/supabase';

export async function signInWithGoogle() {
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
}

export function signOut() {
  supabase.auth.signOut();
}
