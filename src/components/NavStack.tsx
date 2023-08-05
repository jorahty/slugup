import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useViewModel } from '../model/ViewModel';
import Home from './screens/Home';
import Auth from './screens/Auth';
import Chat from './screens/Chat';

const Stack = createNativeStackNavigator();

export default function NavStack() {
  const { session } = useViewModel();

  if (!session) return <Auth />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
