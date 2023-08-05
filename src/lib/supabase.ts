// Temporary hack to suppress gotrue warning
const originalWarn = console.warn;
console.warn = (message, ...args) => {
  if (message.startsWith('@supabase/gotrue-js')) return;
  originalWarn(message, ...args);
};

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = 'https://lsmyklitenukjlkaeenf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbXlrbGl0ZW51a2psa2FlZW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNzc5MzUsImV4cCI6MjAwNjg1MzkzNX0.fu57NItZRGQG4eneVbM0eSilwS7ehmHh4o7xL3GsZXc';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  Platform.OS === 'web'
    ? undefined
    : {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
);
