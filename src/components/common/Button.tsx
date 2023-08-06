import { TouchableOpacity, Text } from 'react-native';

import { styles } from '../../theme/theme';

interface Props {
  title?: string;
  onPress?: () => void;
  variant?: 'outlined' | 'danger';
}

export default function Button({ title, onPress, variant }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant &&
          (variant === 'outlined'
            ? styles.buttonOutlined
            : styles.buttonDanger),
      ]}>
      <Text
        style={[
          styles.buttonText,
          variant === 'outlined' && styles.buttonOutlinedText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
