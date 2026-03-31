import React from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from './FormComponents.styles';
import { Colors } from '../../styles/colors';

interface FormToggleProps {
  label?: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  activeText?: string;
  inactiveText?: string;
}

const FormToggle: React.FC<FormToggleProps> = ({
  label,
  value,
  onToggle,
  containerStyle,
  activeText = 'On',
  inactiveText = 'Off',
}) => {
  return (
    <View style={[styles.toggleContainer, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.toggleWrapper}>
        <TouchableOpacity
          style={[styles.toggleButton, value && styles.toggleButtonActive]}
          onPress={() => onToggle(!value)}
          activeOpacity={0.7}
        >
          <View style={[styles.toggleCircle, value && styles.toggleCircleActive]} />
        </TouchableOpacity>

        <Text style={styles.toggleText}>{value ? activeText : inactiveText}</Text>
      </View>
    </View>
  );
};

export default FormToggle;
