import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from '../../theme/theme';
import { signOut } from '../../repo/auth';

export default function Settings() {
  const { navigate } = useNavigation<any>();
  return (
    <View style={{ gap: 40, padding: 40, paddingTop: 50 }}>
      <TouchableOpacity onPress={signOut}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          <Text style={styles.headline}>Sign out</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Deactivate')}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <FontAwesome5 name="heart-broken" size={24} color="black" />
          <Text style={styles.headline}>Deactivate your account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
