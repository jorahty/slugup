import { Platform, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { signOut } from '../../repo/auth';
import PostingList from '../posting/List';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <PostingList />
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
