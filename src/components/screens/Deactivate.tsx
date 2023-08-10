import { Text, View } from 'react-native';
import { styles } from '../../theme/theme';
import Button from '../common/Button';

export default function Deactivate() {
  return (
    <View style={{ gap: 20, padding: 40, paddingTop: 50 }}>
      <Text style={styles.headline}>Deactivate your account?</Text>
      <View style={{ maxWidth: 150 }}>
        <Button variant="danger" title="Deactivate" />
      </View>
      <Text>This action cannot be undone</Text>
    </View>
  );
}
