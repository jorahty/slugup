import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

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

const Avatar = require('../../../assets/avatar.png');

export const HomeHeaderRight = () => {
  const { setSelectedUser, user } = useViewModel();
  const { navigate } = useNavigation<any>();
  return (
    <View
      style={[
        { flexDirection: 'row', gap: 20 },
        Platform.OS === 'web' && { paddingRight: 20 },
      ]}>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigate('Chats');
        }}>
        <Entypo name="chat" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setSelectedUser(user);
          navigate('Profile');
        }}>
        <Image
          source={user?.avatar_url ? { uri: user.avatar_url } : Avatar}
          style={{ width: 24, height: 24, borderRadius: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
};
