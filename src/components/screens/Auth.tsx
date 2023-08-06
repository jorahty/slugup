import { Text, View } from 'react-native';

import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';

export default function Auth() {
  const { session, signInWithGoogle } = useViewModel();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Auth Screen</Text>
      <Text>session: {String(session)}</Text>
      <Button title="Continue with Google" onPress={signInWithGoogle} />
    </View>
  );
}
