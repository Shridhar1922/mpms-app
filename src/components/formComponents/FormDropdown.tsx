import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { styles } from './FormComponents.styles';
import { Colors } from '../../styles/colors';
import { ChevronDownIcon } from '../../assets/svgIcons/SvgIcon';
import AppIcon from '../appIcon/AppIcon';

interface DropdownOption {
  label: string;
  value: string | number;
}

interface FormDropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string | number;
  onSelect: (value: string | number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  required?: boolean;
}

const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onSelect,
  containerStyle,
  error,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.requiredAsterisk}>*</Text>}
        </View>
      )}

      <TouchableOpacity
        style={[styles.dropdown, error ? styles.dropdownError : null]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.dropdownText, !selectedOption && styles.placeholderText]}>
          {displayText}
        </Text>
        <AppIcon name={ChevronDownIcon} size={12} iconStyle={{ fill: Colors.black }} />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{label || 'Select Option'}</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.modalCloseBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.optionItem, item.value === value && styles.optionItemSelected]}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[styles.optionText, item.value === value && styles.optionTextSelected]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => String(item.value)}
              scrollEnabled={true}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FormDropdown;
