import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { A } from '@expo/html-elements';
import * as Haptics from 'expo-haptics';

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

const Logo = require('../../../assets/header-logo.png');

export const HomeHeaderLeft = () => {
  return (
    <A
      href="https://slugup.com"
      disabled={Platform.OS !== 'web'}
      style={Platform.OS === 'web' && { paddingLeft: 20 }}>
      <Image source={Logo} style={{ width: 1451 / 12, height: 351 / 12 }} />
    </A>
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
          if (Platform.OS !== 'web')
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigate('Chats');
        }}>
        <Entypo name="chat" size={24} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS !== 'web')
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
