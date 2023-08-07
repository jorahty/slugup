import { Text, View } from 'react-native';

import { useViewModel } from '../../model/ViewModel';

export default function Profile() {
  const { selectedUser } = useViewModel();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{selectedUser.full_name}'s Profile</Text>
    </View>
  );
}
