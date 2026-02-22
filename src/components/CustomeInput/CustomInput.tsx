import React from 'react';
import { Text, TextInput, View, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { styles } from './CustomInput.styles';

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

export default CustomInput;
