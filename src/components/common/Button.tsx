import { TouchableOpacity, Text } from 'react-native';

import { styles } from '../../theme/theme';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'outlined' | 'danger';
  decorator?: ReactNode;
}

export default function Button({
  title,
  onPress,
  disabled,
  variant,
  decorator,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        variant &&
          (variant === 'outlined'
            ? styles.buttonOutlined
            : styles.buttonDanger),
        disabled && styles.disabled,
      ]}>
      {decorator}
      {title && (
        <Text
          style={[
            styles.buttonText,
            variant === 'outlined' && styles.buttonOutlinedText,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
