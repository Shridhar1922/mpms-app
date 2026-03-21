import React, { useState } from 'react';
import { Platform, Modal, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { pickImage } from '../../../../utils/imagePicker';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform as RNPlatform,
} from 'react-native';
import styles from './styles';
import { CommonHeader } from '../../../../components/commonHeader/CommonHeader';
import Images from '../../../../constants/Images';

interface EditProfileScreenProps {
  employeeId: string;
  department: string;
  role: string;
  joiningDepartment: string;
  profileImage: string;
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  country: string;
  state: string;
  currentAddress: string;
  permanentAddress: string;
}

const EditProfileScreen: React.FC<Partial<EditProfileScreenProps>> = (props) => {
  const [profileImage, setProfileImage] = useState(props.profileImage || '');
  const [fullName, setFullName] = useState(props.fullName || '');
  const [phone, setPhone] = useState(props.phone || '');
  const [email, setEmail] = useState(props.email || '');
  const [dob, setDob] = useState(props.dob || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [country, setCountry] = useState(props.country || '');
  const [state, setState] = useState(props.state || '');
  const [currentAddress, setCurrentAddress] = useState(props.currentAddress || '');
  const [permanentAddress, setPermanentAddress] = useState(props.permanentAddress || '');

  // Placeholder for image picker
  const handleImagePick = async () => {
    try {
      const asset = await pickImage();
      if (asset && asset.uri) {
        setProfileImage(asset.uri);
      }
    } catch (error) {
      // Optionally handle error (e.g., show a toast)
      console.warn('Image pick error:', error);
    }
  };

  const handleDobChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      setDob(`${yyyy}-${mm}-${dd}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={RNPlatform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <CommonHeader title="Edit Profile" showBackBtn={true} />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <Image source={Images.editIcon} style={styles.editIconStyle} />
          </TouchableOpacity>
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.section}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />
              <Text style={styles.label}>Phone No</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text style={styles.label}>Date of Birth</Text>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  value={dob}
                  onChangeText={setDob}
                  placeholder="YYYY-MM-DD"
                  editable={true}
                  pointerEvents="none"
                />
              </Pressable>
              {showDatePicker &&
                (Platform.OS === 'ios' ? (
                  <Modal
                    transparent={true}
                    animationType="slide"
                    visible={showDatePicker}
                    onRequestClose={() => setShowDatePicker(false)}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#fff',
                          margin: 20,
                          borderRadius: 10,
                          padding: 16,
                        }}
                      >
                        <DateTimePicker
                          value={dob ? new Date(dob) : new Date()}
                          mode="date"
                          display="spinner"
                          onChange={handleDobChange}
                        />
                        <Pressable
                          onPress={() => setShowDatePicker(false)}
                          style={{ marginTop: 10, alignItems: 'center' }}
                        >
                          <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Done</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                ) : (
                  <DateTimePicker
                    value={dob ? new Date(dob) : new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDobChange}
                  />
                ))}
              <Text style={styles.label}>Country</Text>
              <TextInput style={styles.input} value={country} onChangeText={setCountry} />
              <Text style={styles.label}>State</Text>
              <TextInput style={styles.input} value={state} onChangeText={setState} />
              <Text style={styles.label}>Current Address</Text>
              <TextInput
                style={[styles.input, styles.addressInput]}
                value={currentAddress}
                onChangeText={setCurrentAddress}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <Text style={styles.label}>Permanent Address</Text>
              <TextInput
                style={[styles.input, styles.addressInput]}
                value={permanentAddress}
                onChangeText={setPermanentAddress}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.fixedSaveButtonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
