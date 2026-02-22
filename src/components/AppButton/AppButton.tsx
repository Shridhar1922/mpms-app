import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../../styles/colors';
import { CommonStyles } from '../../styles/commonStyles';
import { styles } from './AppButton.styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        CommonStyles.row,
        CommonStyles.justifyCenter,
        isPrimary ? styles.primaryButton : styles.outlineButton,
        (disabled || loading) && CommonStyles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? Colors.white : Colors.blue} />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.primaryText : styles.outlineText, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
