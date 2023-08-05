import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Auth from './screens/Auth';
import Chat from './screens/Chat';

const Stack = createNativeStackNavigator();

export default function NavStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={false ? 'Home' : 'Auth'}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
