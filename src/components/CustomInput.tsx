import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Colors } from '../styles/colors';
import { FontFamily, FontSize } from '../styles/typography';
import { moderateScale, verticalScale } from '../styles/responsiveStyles';
interface CustomInputProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  containerStyle,
  error,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor="#999"
        // Spreading 'rest' allows props like onChangeText, value, etc.
        {...rest}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
    width: '100%',
  },
  label: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_LIGHT,
    fontSize: FontSize.S_10,
    marginBottom: moderateScale(5),
    color: Colors.darkgray,
  },
  input: {
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: 8,
    paddingHorizontal: moderateScale(15),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: FontSize.S_10,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: FontSize.XS_8,
    marginTop: moderateScale(5),
  },
});

export default CustomInput;
