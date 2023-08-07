import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';

import { supabase } from '../lib/supabase';
import Home, { HomeHeaderLeft } from './screens/Home';
import Auth from './screens/Auth';
import NameForm from './screens/NameForm';
import Chat from './screens/Chat';
import Loading from './common/Loading';

const Stack = createNativeStackNavigator();

export default function NavStack() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasName, setHasName] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);

      if (session?.user) {
        supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .then(({ data }) => {
            if (data![0].full_name === null) {
              setHasName(false);
            }
          });
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) return <Loading />;

  if (!session) return <Auth />;

  if (!hasName)
    return <NameForm id={session.user.id} setHasName={setHasName} />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: 'center',
            headerLeft: HomeHeaderLeft,
          }}
        />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
