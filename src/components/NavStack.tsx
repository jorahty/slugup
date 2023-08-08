import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useViewModel } from '../model/ViewModel';
import Loading from './common/Loading';
import Auth from './screens/Auth';
import NameForm from './screens/NameForm';
import Home, { HomeHeaderLeft, HomeHeaderRight } from './screens/Home';
import Chat from './screens/Chat';
import Chats from './screens/Chats';
import ProfileScreen from './screens/Profile';
import EditProfile from './screens/EditProfile';

const Stack = createNativeStackNavigator();

export default function NavStack() {
  const { session, loadingSession, user } = useViewModel();

  if (loadingSession) return <Loading />;

  if (!session) return <Auth />;

  if (user && !user.full_name) return <NameForm />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Posts',
            headerTitle: () => <></>,
            headerLeft: HomeHeaderLeft,
            headerRight: HomeHeaderRight,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerTitle: () => <></> }}
        />
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={{ title: 'Messages' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerTitle: () => <></> }}
        />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
