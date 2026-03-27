import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormTextInput from '../../../components/formComponents/FormTextInput';
import FormDropdown from '../../../components/formComponents/FormDropdown';
import FormToggle from '../../../components/formComponents/FormToggle';
import AppButton from '../../../components/appButton/AppButton';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import { CommonStyles } from '../../../styles/commonStyles';
import { styles } from './AddEmployeeScreen.styles';
import { Colors } from '../../../styles/colors';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { MainStackParamList } from '../../../constants/MainStackParamList';

type NavigationProp = StackNavigationProp<MainStackParamList>;

interface FormState {
  employeeName: string;
  selectEmployer: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  salary: string;
  weeklyOff: string;
  permanentAddress: string;
  currentAddress: string;
  country: string;
  state: string;
  comment: string;
  allowComments: boolean;
  status: string;
  designation: string;
  department: string;
  aadharCardNo: string;
  panCardNo: string;
  joiningDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  bankAccountNo: string;
  bankName: string;
  ifscCode: string;
  branch: string;
  passportPhoto: string | null;
  aadharCardFrontPhoto: string | null;
  aadharCardBackPhoto: string | null;
  panCardPhoto: string | null;
  bankCancelledCheque: string | null;
}

const EMPLOYER_OPTIONS = [
  { label: 'Company A', value: 'company_a' },
  { label: 'Company B', value: 'company_b' },
  { label: 'Company C', value: 'company_c' },
];

const WEEKLY_OFF_OPTIONS = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
];

const STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'On Leave', value: 'on_leave' },
];

const COUNTRY_OPTIONS = [
  { label: 'India', value: 'india' },
  { label: 'United States', value: 'usa' },
  { label: 'United Kingdom', value: 'uk' },
];

const STATE_OPTIONS = [
  { label: 'Karnataka', value: 'karnataka' },
  { label: 'Maharashtra', value: 'maharashtra' },
  { label: 'Tamil Nadu', value: 'tamil_nadu' },
  { label: 'Delhi', value: 'delhi' },
];

export const AddEmployeeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    employeeName: '',
    selectEmployer: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    salary: '',
    weeklyOff: '',
    permanentAddress: '',
    currentAddress: '',
    country: '',
    state: '',
    comment: '',
    allowComments: false,
    status: '',
    designation: '',
    department: '',
    aadharCardNo: '',
    panCardNo: '',
    joiningDate: '',
    shiftStartTime: '',
    shiftEndTime: '',
    bankAccountNo: '',
    bankName: '',
    ifscCode: '',
    branch: '',
    passportPhoto: null,
    aadharCardFrontPhoto: null,
    aadharCardBackPhoto: null,
    panCardPhoto: null,
    bankCancelledCheque: null,
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleInputChange = (field: keyof FormState, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee name is required';
    if (!formData.selectEmployer) newErrors.selectEmployer = 'Please select an employer';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.status) newErrors.status = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Submitting employee data:', formData);
      Alert.alert('Success', 'Employee added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (field: keyof FormState) => {
    // TODO: Implement image picker
    Alert.alert('Image Picker', `Upload ${field} - Feature coming soon`);
  };

  const handleCancel = () => {
    if (
      formData.employeeName ||
      formData.email ||
      formData.phone ||
      Object.values(formData).some((val) => val)
    ) {
      Alert.alert('Discard Changes?', 'Are you sure you want to discard all changes?', [
        { text: 'Cancel', onPress: () => {} },
        { text: 'Discard', onPress: () => navigation.goBack() },
      ]);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={CommonStyles.container}>
      <CommonHeader title="Add Employee" showBackBtn={true} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* ========== Personal Information Section ========== */}
          <Text style={styles.sectionHeader}>Personal Information</Text>

          <FormTextInput
            label="Employee Name"
            placeholder="Enter employee name"
            value={formData.employeeName}
            onChangeText={(value) => handleInputChange('employeeName', value)}
            error={errors.employeeName as string}
            required
          />

          <FormDropdown
            label="Select Employer"
            options={EMPLOYER_OPTIONS}
            value={formData.selectEmployer}
            onSelect={(value) => handleInputChange('selectEmployer', value)}
            error={errors.selectEmployer as string}
            required
          />

          <FormTextInput
            label="Email"
            placeholder="Enter email address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            error={errors.email as string}
            required
          />

          <FormTextInput
            label="Phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
            error={errors.phone as string}
            required
          />

          <FormTextInput
            label="Date of Birth"
            placeholder="DD/MM/YYYY"
            value={formData.dateOfBirth}
            onChangeText={(value) => handleInputChange('dateOfBirth', value)}
          />

          {/* ========== Employment Details Section ========== */}
          <Text style={styles.sectionHeader}>Employment Details</Text>

          <FormTextInput
            label="Salary"
            placeholder="Enter salary amount"
            value={formData.salary}
            onChangeText={(value) => handleInputChange('salary', value)}
            keyboardType="decimal-pad"
            error={errors.salary as string}
            required
          />

          <FormDropdown
            label="Weekly Off"
            options={WEEKLY_OFF_OPTIONS}
            value={formData.weeklyOff}
            onSelect={(value) => handleInputChange('weeklyOff', value)}
          />

          <FormTextInput
            label="Designation"
            placeholder="Enter designation"
            value={formData.designation}
            onChangeText={(value) => handleInputChange('designation', value)}
            error={errors.designation as string}
            required
          />

          <FormTextInput
            label="Department"
            placeholder="Enter department"
            value={formData.department}
            onChangeText={(value) => handleInputChange('department', value)}
            error={errors.department as string}
            required
          />

          <FormTextInput
            label="Joining Date"
            placeholder="DD/MM/YYYY"
            value={formData.joiningDate}
            onChangeText={(value) => handleInputChange('joiningDate', value)}
          />

          {/* ========== Shift Details Section ========== */}
          <Text style={styles.sectionHeader}>Shift Details</Text>

          <FormTextInput
            label="Shift Start Time"
            placeholder="HH:MM"
            value={formData.shiftStartTime}
            onChangeText={(value) => handleInputChange('shiftStartTime', value)}
          />

          <FormTextInput
            label="Shift End Time"
            placeholder="HH:MM"
            value={formData.shiftEndTime}
            onChangeText={(value) => handleInputChange('shiftEndTime', value)}
          />

          {/* ========== Address Section ========== */}
          <Text style={styles.sectionHeader}>Address</Text>

          <FormTextInput
            label="Permanent Address"
            placeholder="Enter permanent address"
            value={formData.permanentAddress}
            onChangeText={(value) => handleInputChange('permanentAddress', value)}
            multiline
            numberOfLines={3}
          />

          <FormTextInput
            label="Current Address"
            placeholder="Enter current address"
            value={formData.currentAddress}
            onChangeText={(value) => handleInputChange('currentAddress', value)}
            multiline
            numberOfLines={3}
          />

          <FormDropdown
            label="Country"
            options={COUNTRY_OPTIONS}
            value={formData.country}
            onSelect={(value) => handleInputChange('country', value)}
          />

          <FormDropdown
            label="State"
            options={STATE_OPTIONS}
            value={formData.state}
            onSelect={(value) => handleInputChange('state', value)}
          />

          {/* ========== Identity Details Section ========== */}
          <Text style={styles.sectionHeader}>Identity Details</Text>

          <FormTextInput
            label="Aadhar Card No"
            placeholder="Enter Aadhar number"
            value={formData.aadharCardNo}
            onChangeText={(value) => handleInputChange('aadharCardNo', value)}
            keyboardType="numeric"
          />

          <FormTextInput
            label="PAN Card No"
            placeholder="Enter PAN number"
            value={formData.panCardNo}
            onChangeText={(value) => handleInputChange('panCardNo', value)}
          />

          {/* ========== Bank Details Section ========== */}
          <Text style={styles.sectionHeader}>Bank Details</Text>

          <FormTextInput
            label="Bank Account No"
            placeholder="Enter bank account number"
            value={formData.bankAccountNo}
            onChangeText={(value) => handleInputChange('bankAccountNo', value)}
            keyboardType="numeric"
          />

          <FormTextInput
            label="Bank Name"
            placeholder="Enter bank name"
            value={formData.bankName}
            onChangeText={(value) => handleInputChange('bankName', value)}
          />

          <FormTextInput
            label="IFSC Code"
            placeholder="Enter IFSC code"
            value={formData.ifscCode}
            onChangeText={(value) => handleInputChange('ifscCode', value)}
          />

          <FormTextInput
            label="Branch"
            placeholder="Enter branch name"
            value={formData.branch}
            onChangeText={(value) => handleInputChange('branch', value)}
          />

          {/* ========== Comments Section ========== */}
          <Text style={styles.sectionHeader}>Comments</Text>

          <FormTextInput
            label="Comment"
            placeholder="Add any comments"
            value={formData.comment}
            onChangeText={(value) => handleInputChange('comment', value)}
            multiline
            numberOfLines={3}
          />

          <FormToggle
            label="Allow Comments"
            value={formData.allowComments}
            onToggle={(value) => handleInputChange('allowComments', value)}
            activeText="Enabled"
            inactiveText="Disabled"
          />

          {/* ========== Status Section ========== */}
          <Text style={styles.sectionHeader}>Status</Text>

          <FormDropdown
            label="Status"
            options={STATUS_OPTIONS}
            value={formData.status}
            onSelect={(value) => handleInputChange('status', value)}
            error={errors.status as string}
            required
          />

          {/* ========== Document Upload Section ========== */}
          <Text style={styles.sectionHeader}>Document Upload</Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handlePhotoUpload('passportPhoto')}
          >
            <Text style={styles.uploadButtonText}>📷 Upload Passport Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handlePhotoUpload('aadharCardFrontPhoto')}
          >
            <Text style={styles.uploadButtonText}>📷 Upload Aadhar Card Front</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handlePhotoUpload('aadharCardBackPhoto')}
          >
            <Text style={styles.uploadButtonText}>📷 Upload Aadhar Card Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handlePhotoUpload('panCardPhoto')}
          >
            <Text style={styles.uploadButtonText}>📷 Upload PAN Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handlePhotoUpload('bankCancelledCheque')}
          >
            <Text style={styles.uploadButtonText}>📄 Upload Bank Cancelled Cheque</Text>
          </TouchableOpacity>

          {/* ========== Action Buttons ========== */}
          <View style={styles.buttonContainer}>
            <AppButton
              title="Cancel"
              onPress={handleCancel}
              loading={loading}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />

            <AppButton
              title="Add Employee"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
