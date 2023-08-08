import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import { useViewModel } from '../../model/ViewModel';
import PostList from '../post/List';
import PostInput from '../post/Input';
import PostMenu from '../post/Menu';
import { colors } from '../../theme/theme';

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
    <Text
      style={[
        {
          fontWeight: '800',
          fontStyle: 'italic',
        },
        Platform.OS === 'web' && { paddingLeft: 20 },
      ]}>
      Slugup
    </Text>
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
        <Entypo name="chat" size={24} color={colors.blue} />
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
        <Ionicons name="person" size={24} color={colors.blue} />
      </TouchableOpacity>
    </View>
  );
};
