import { Text, View } from 'react-native';

import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';

export default function Home() {
  const { signOut, session } = useViewModel();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>session: {String(session)}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}
