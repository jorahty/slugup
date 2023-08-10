import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme/theme';
import { useViewModel } from '../model/ViewModel';
import Loading from './common/Loading';
import Auth from './screens/Auth';
import NameForm from './screens/NameForm';
import Home, { HomeHeaderLeft, HomeHeaderRight } from './screens/Home';
import Chat from './screens/Chat';
import Chats from './screens/Chats';
import ProfileScreen, { ProfileHeaderRight } from './screens/Profile';
import EditProfile from './screens/EditProfile';
import Settings from './screens/Settings';
import Deactivate from './screens/Deactivate';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
};

export default function NavStack() {
  const { session, loadingSession, user } = useViewModel();

  if (loadingSession) return <Loading />;

  if (!session) return <Auth />;

  if (user && !user.full_name) return <NameForm />;

  return (
    <NavigationContainer theme={MyTheme}>
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
          options={{
            headerTitle: () => <></>,
            headerRight: ProfileHeaderRight,
          }}
        />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Deactivate" component={Deactivate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
