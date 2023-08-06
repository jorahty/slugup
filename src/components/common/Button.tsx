import { TouchableOpacity, Text } from 'react-native';

import { styles } from '../../theme/theme';

interface Props {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'outlined' | 'danger';
}

export default function Button({ title, onPress, disabled, variant }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.disabled,
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
