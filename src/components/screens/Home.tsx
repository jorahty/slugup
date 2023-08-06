import { Text, View } from 'react-native';

import Button from '../common/Button';
import { signOut } from '../../repo/auth';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
