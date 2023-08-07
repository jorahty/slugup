import { Image, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useViewModel } from '../../model/ViewModel';
import { colors, styles } from '../../theme/theme';
import MessageList from '../message/List';
import MessageInput from '../message/Input';

const Avatar = require('../../../assets/avatar.png');

export default function Chat() {
  const { selectedUser } = useViewModel();
  const { navigate } = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigate('Profile')}
        style={{
          flexDirection: 'row',
          padding: 20,
          gap: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderBottomColor: colors.grey300,
        }}>
        <Image
          source={
            selectedUser.avatar_url ? { uri: selectedUser.avatar_url } : Avatar
          }
          style={{ width: 60, height: 60, borderRadius: 10 }}
        />
        <Text style={styles.headline}>{selectedUser.full_name}</Text>
      </TouchableOpacity>
      <MessageList />
      <MessageInput />
    </View>
  );
}
