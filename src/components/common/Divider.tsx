import { Text, View } from 'react-native';
import { colors } from '../../theme/theme';

export default function Divider() {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          borderTopWidth: 2,
          borderColor: colors.grey400,
        }}
      />
      <Text>Or</Text>
      <View
        style={{
          flex: 1,
          borderTopWidth: 2,
          borderColor: colors.grey400,
        }}
      />
    </View>
  );
}
