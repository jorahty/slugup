import { Pressable, Text } from 'react-native';

import { styles } from '../../theme/theme';

interface Props {
  title?: string;
  onPress?: () => void;
}

export default function Button({ title, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
