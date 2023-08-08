import { Platform, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

import { signOut } from '../../repo/auth';
import { useViewModel } from '../../model/ViewModel';
import PostList from '../post/List';
import PostInput from '../post/Input';
import PostMenu from '../post/Menu';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <PostList />
      <PostInput />
      <PostMenu />
    </View>
  );
}

export const HomeHeaderLeft = () => {
  return (
    <TouchableOpacity
      onPress={signOut}
      style={Platform.OS === 'web' && { paddingLeft: 20 }}>
      <MaterialIcons name="logout" size={24} />
    </TouchableOpacity>
  );
};

export const HomeHeaderRight = () => {
  const { setSelectedUser, session } = useViewModel();
  const { navigate } = useNavigation<any>();
  return (
    <View
      style={[
        { flexDirection: 'row', gap: 20 },
        Platform.OS === 'web' && { paddingRight: 20 },
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigate('Chats');
        }}>
        <MaterialIcons name="chat-bubble-outline" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedUser({
            id: session.user.id,
            full_name: 'Immortan Joe',
            avatar_url: null,
          });
          navigate('Profile');
        }}>
        <Octicons name="person" size={24} />
      </TouchableOpacity>
    </View>
  );
};
