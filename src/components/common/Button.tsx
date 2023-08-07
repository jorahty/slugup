import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { colors, styles } from '../../theme/theme';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  decorator?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'outlined' | 'danger';
}

export default function Button({
  title,
  decorator,
  onPress,
  disabled,
  loading,
  variant,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        variant &&
          (variant === 'outlined'
            ? styles.buttonOutlined
            : styles.buttonDanger),
        disabled && styles.disabled,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outlined' ? colors.grey500 : colors.white}
        />
      ) : (
        <>
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
        </>
      )}
    </TouchableOpacity>
  );
}
