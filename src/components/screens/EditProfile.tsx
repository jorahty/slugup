import { Text, View } from 'react-native';

export default function EditProfile({
  route: {
    params: { profile },
  },
}: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit Profile</Text>
      <Text>{profile.full_name}</Text>
    </View>
  );
}
