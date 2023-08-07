import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from './src/theme/theme';
import NavStack from './src/components/NavStack';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.grey200,
      }}>
      <View style={{ flex: 1, maxWidth: 900, backgroundColor: colors.white }}>
        <NavStack />
      </View>
      <StatusBar style="dark" />
    </View>
  );
}
