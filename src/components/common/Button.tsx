import { TouchableOpacity, Text } from 'react-native';

import { styles } from '../../theme/theme';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  onPress?: () => void;
  variant?: 'outlined' | 'danger';
  decorator?: ReactNode;
}

export default function Button({ title, onPress, variant, decorator }: Props) {
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
      {decorator}
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
