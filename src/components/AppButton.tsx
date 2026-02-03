import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { moderateScale, verticalScale } from '../styles/responsiveStyles';
import { FontFamily, FontSize } from '../styles/typography';
import { Colors } from '../styles/colors';
import { CommonStyles } from '../styles/commonStyles';

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

const styles = StyleSheet.create({
  button: {
    height: verticalScale(50),
    borderRadius: 8,
    marginVertical: verticalScale(10),
    paddingHorizontal: moderateScale(20),
  },
  primaryButton: {
    backgroundColor: Colors.blue,
  },
  outlineButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  text: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: FontSize.S_12,
  },
  primaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.blue,
  },
});

export default AppButton;
