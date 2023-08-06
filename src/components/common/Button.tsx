import { TouchableOpacity, Text } from 'react-native';

import { styles } from '../../theme/theme';

interface Props {
  title?: string;
  onPress?: () => void;
}

export default function Button({ title, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
