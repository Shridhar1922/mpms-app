import React from 'react';
import { Text, TextInput, View, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { styles } from './FormComponents.styles';
import { Colors } from '../../styles/colors';

interface FormTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  required?: boolean;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  containerStyle,
  error,
  style,
  required = false,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.requiredAsterisk}>*</Text>}
        </View>
      )}

      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={Colors.lightgray}
        {...rest}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FormTextInput;
