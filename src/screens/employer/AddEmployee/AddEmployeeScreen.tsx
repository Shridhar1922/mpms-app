import React, { useState, useMemo, useEffect, use } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { useToast } from '../../../components/toast/ToastContext/ToastContext';
import { useNavigation } from '@react-navigation/native';
import { Country, State } from 'country-state-city';
import DatePicker from 'react-native-date-picker';
import FormTextInput from '../../../components/formComponents/FormTextInput';
import FormDropdown from '../../../components/formComponents/FormDropdown';
import FormToggle from '../../../components/formComponents/FormToggle';
import { PhotoUploadField } from '../../../components/formComponents/PhotoUploadField';
import AppButton from '../../../components/appButton/AppButton';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import { CommonStyles } from '../../../styles/commonStyles';
import { styles } from './AddEmployeeScreen.styles';
import { useGetEmployersQuery, useCreateEmployeeMutation } from '../../../redux/api/employees.api';
import { createMultipleFilesFormData } from '../../../utils/fileUpload';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { MainStackParamList } from '../../../constants/MainStackParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../../constants/StaticData';

type NavigationProp = StackNavigationProp<MainStackParamList>;

interface PhotoData {
  uri: string;
  type?: string;
  name?: string;
}

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
  passportPhoto: PhotoData | null;
  aadharCardFrontPhoto: PhotoData | null;
  aadharCardBackPhoto: PhotoData | null;
  panCardPhoto: PhotoData | null;
  bankCancelledCheque: PhotoData | null;
  employerId: string | null;
}

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

// Generate dynamic country options
const getCountryOptions = () => {
  const countries = Country.getAllCountries();
  return countries.map((country: any) => ({
    label: country.name,
    value: country.isoCode,
  }));
};

// Generate dynamic state options based on country
const getStateOptions = (countryCode: string) => {
  if (!countryCode) return [];
  const states = State.getStatesOfCountry(countryCode);
  return states.map((state: any) => ({
    label: state.name,
    value: state.isoCode,
  }));
};

export const AddEmployeeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    data: employersData,
    isLoading: employersLoading,
    error: employersError,
  } = useGetEmployersQuery();

  const [createEmployee, { isLoading: isCreatingEmployee }] = useCreateEmployeeMutation();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem(USER_INFO.USER);
        if (json) {
          const userData = JSON.parse(json);
          setUser(userData);
        }
      } catch (e) {
        console.warn('Failed to load user from storage', e);
      }
    };
    loadUser();
  }, []);

  // Transform employers data into dropdown options
  const employerOptions = useMemo(() => {
    if (!employersData?.data?.items || !Array.isArray(employersData.data.items)) {
      return [];
    }

    console.log('Employers data for dropdown..:', employersData.data.items);
    return employersData.data.items.map((employer: any) => ({
      label: employer.employerName || employer.businessName || 'Unknown',
      value: employer.id || '',
    }));
  }, [employersData]);

  // Get all countries
  const countryOptions = useMemo(() => getCountryOptions(), []);

  // Form state
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
    employerId: null,
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  // Date/Time Picker States
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [showJoiningDatePicker, setShowJoiningDatePicker] = useState(false);
  const [showShiftStartTimePicker, setShowShiftStartTimePicker] = useState(false);
  const [showShiftEndTimePicker, setShowShiftEndTimePicker] = useState(false);
  const [tempDOB, setTempDOB] = useState(new Date());
  const [tempJoiningDate, setTempJoiningDate] = useState(new Date());
  const [tempShiftStartTime, setTempShiftStartTime] = useState(new Date());
  const [tempShiftEndTime, setTempShiftEndTime] = useState(new Date());

  // Get states for selected country
  const stateOptions = useMemo(() => {
    return getStateOptions(formData.country);
  }, [formData.country]);

  const handleInputChange = (field: keyof FormState, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Reset state when country changes
      if (field === 'country') {
        updated.state = '';
      }
      return updated;
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Date/Time Formatting Functions
  const formatDate = (date: Date | string): string => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date | string): string => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Date/Time Picker Handlers
  const handleDOBChange = (date: Date) => {
    setTempDOB(date);
    handleInputChange('dateOfBirth', date.toISOString());
    setShowDOBPicker(false);
  };

  const handleJoiningDateChange = (date: Date) => {
    setTempJoiningDate(date);
    handleInputChange('joiningDate', date.toISOString());
    setShowJoiningDatePicker(false);
  };

  const handleShiftStartTimeChange = (date: Date) => {
    setTempShiftStartTime(date);
    handleInputChange('shiftStartTime', date.toISOString());
    setShowShiftStartTimePicker(false);
  };

  const handleShiftEndTimeChange = (date: Date) => {
    setTempShiftEndTime(date);
    handleInputChange('shiftEndTime', date.toISOString());
    setShowShiftEndTimePicker(false);
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
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      // Get country name from ISO code
      const countries = Country.getAllCountries();
      const selectedCountry = countries.find((c) => c.isoCode === formData.country);
      const countryName = selectedCountry ? selectedCountry.name : formData.country;

      // Get state name from ISO code
      let stateName = formData.state;
      if (formData.country && formData.state) {
        const states = State.getStatesOfCountry(formData.country);
        const selectedState = states.find((s) => s.isoCode === formData.state);
        stateName = selectedState ? selectedState.name : formData.state;
      }
      console.log('formData before submission:', formData);

      // Prepare employee data matching API structure
      const employeeData = {
        name: formData.employeeName,
        email: formData.email,
        phone: formData.phone,
        employerId: formData.selectEmployer,
        employeeEmail: formData.email,
        employeePhone: formData.phone,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
        salary: formData.salary,
        permanentAddress: formData.permanentAddress,
        currentAddress: formData.currentAddress,
        aadharCardNumber: formData.aadharCardNo,
        panCardNumber: formData.panCardNo,
        joiningDate: formData.joiningDate ? new Date(formData.joiningDate).toISOString() : null,
        bankAccountNumber: formData.bankAccountNo,
        bankName: formData.bankName,
        ifscCode: formData.ifscCode,
        bankBranch: formData.branch,
        designation: formData.designation,
        department: formData.department,
        country: countryName,
        state: stateName,
        allowComments: formData.allowComments,
        comment: formData.comment,
        status: formData.status,
        startDate: formData.joiningDate ? new Date(formData.joiningDate).toISOString() : null,
        dueDate: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).toISOString(),
        // Photo URLs - these can be uploaded separately or added here
        passportPhotoURL: 'https://dummy.com/passport.jpg',
        aadharCardPhotoFrontURL: 'https://dummy.com/aadhar-front.jpg',
        aadharCardPhotoBackURL: 'https://dummy.com/aadhar-back.jpg',
        panCardFrontURL: 'https://dummy.com/pan-front.jpg',
        panCardBackURL: 'https://dummy.com/pan-back.jpg',
        passbookOrCancelledChequeURL: 'https://dummy.com/passbook.jpg',
        addressProof: null,
      };

      console.log('Submitting employee data:', employeeData);

      // Submit to API
      const result = await createEmployee(employeeData).unwrap();

      if (result?.success || result?.id) {
        showToast('Employee added successfully', 'success');
        navigation.goBack();
      } else {
        throw new Error(result?.message || 'Failed to create employee');
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || 'Failed to add employee. Please try again.';
      showToast(errorMessage, 'error');
      console.error('Employee creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoSelected = (field: keyof FormState, photo: PhotoData | null) => {
    handleInputChange(field, photo);
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
      ]); // Keep Alert for confirmation dialogs
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
            options={employerOptions}
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

          <Text style={styles.dateTimeLabel}>Date of Birth</Text>
          <TouchableOpacity
            onPress={() => {
              setTempDOB(formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date());
              setShowDOBPicker(true);
            }}
            style={[styles.dateTimeInput]}
          >
            <Text style={[styles.dateTimeValue, !formData.dateOfBirth && styles.placeholder]}>
              {formData.dateOfBirth ? formatDate(formData.dateOfBirth) : 'DD/MM/YYYY'}
            </Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={showDOBPicker}
            date={tempDOB}
            onConfirm={handleDOBChange}
            onCancel={() => setShowDOBPicker(false)}
            mode="date"
            title="Select Date of Birth"
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

          <Text style={styles.dateTimeLabel}>Joining Date</Text>
          <TouchableOpacity
            onPress={() => {
              setTempJoiningDate(
                formData.joiningDate ? new Date(formData.joiningDate) : new Date()
              );
              setShowJoiningDatePicker(true);
            }}
            style={[styles.dateTimeInput]}
          >
            <Text style={[styles.dateTimeValue, !formData.joiningDate && styles.placeholder]}>
              {formData.joiningDate ? formatDate(formData.joiningDate) : 'DD/MM/YYYY'}
            </Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={showJoiningDatePicker}
            date={tempJoiningDate}
            onConfirm={handleJoiningDateChange}
            onCancel={() => setShowJoiningDatePicker(false)}
            mode="date"
            title="Select Joining Date"
          />

          {/* ========== Shift Details Section ========== */}
          <Text style={styles.sectionHeader}>Shift Details</Text>

          <Text style={styles.dateTimeLabel}>Shift Start Time</Text>
          <TouchableOpacity
            onPress={() => {
              setTempShiftStartTime(
                formData.shiftStartTime ? new Date(formData.shiftStartTime) : new Date()
              );
              setShowShiftStartTimePicker(true);
            }}
            style={[styles.dateTimeInput]}
          >
            <Text style={[styles.dateTimeValue, !formData.shiftStartTime && styles.placeholder]}>
              {formData.shiftStartTime ? formatTime(formData.shiftStartTime) : 'HH:MM'}
            </Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={showShiftStartTimePicker}
            date={tempShiftStartTime}
            onConfirm={handleShiftStartTimeChange}
            onCancel={() => setShowShiftStartTimePicker(false)}
            mode="time"
            title="Select Shift Start Time"
          />

          <Text style={styles.dateTimeLabel}>Shift End Time</Text>
          <TouchableOpacity
            onPress={() => {
              setTempShiftEndTime(
                formData.shiftEndTime ? new Date(formData.shiftEndTime) : new Date()
              );
              setShowShiftEndTimePicker(true);
            }}
            style={[styles.dateTimeInput]}
          >
            <Text style={[styles.dateTimeValue, !formData.shiftEndTime && styles.placeholder]}>
              {formData.shiftEndTime ? formatTime(formData.shiftEndTime) : 'HH:MM'}
            </Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={showShiftEndTimePicker}
            date={tempShiftEndTime}
            onConfirm={handleShiftEndTimeChange}
            onCancel={() => setShowShiftEndTimePicker(false)}
            mode="time"
            title="Select Shift End Time"
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
            options={countryOptions}
            value={formData.country}
            onSelect={(value) => handleInputChange('country', value)}
          />

          <FormDropdown
            label="State"
            options={stateOptions}
            value={formData.state}
            onSelect={(value) => handleInputChange('state', value)}
            placeholder={formData.country ? 'Select a state' : 'Please select a country first'}
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

          <PhotoUploadField
            label="Passport Photo"
            placeholder="Tap to upload passport photo"
            onPhotoSelected={(photo) => handlePhotoSelected('passportPhoto', photo)}
            selectedPhoto={formData.passportPhoto}
          />

          <PhotoUploadField
            label="Aadhar Card Front"
            placeholder="Tap to upload Aadhar card front side"
            onPhotoSelected={(photo) => handlePhotoSelected('aadharCardFrontPhoto', photo)}
            selectedPhoto={formData.aadharCardFrontPhoto}
          />

          <PhotoUploadField
            label="Aadhar Card Back"
            placeholder="Tap to upload Aadhar card back side"
            onPhotoSelected={(photo) => handlePhotoSelected('aadharCardBackPhoto', photo)}
            selectedPhoto={formData.aadharCardBackPhoto}
          />

          <PhotoUploadField
            label="PAN Card"
            placeholder="Tap to upload PAN card"
            onPhotoSelected={(photo) => handlePhotoSelected('panCardPhoto', photo)}
            selectedPhoto={formData.panCardPhoto}
          />

          <PhotoUploadField
            label="Bank Cancelled Cheque"
            placeholder="Tap to upload bank cancelled cheque"
            onPhotoSelected={(photo) => handlePhotoSelected('bankCancelledCheque', photo)}
            selectedPhoto={formData.bankCancelledCheque}
          />

          {/* ========== Action Buttons ========== */}
          <View style={styles.buttonContainer}>
            <AppButton
              title="Cancel"
              onPress={handleCancel}
              loading={loading || isCreatingEmployee}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />

            <AppButton
              title="Add Employee"
              onPress={handleSubmit}
              loading={loading || isCreatingEmployee}
              style={styles.submitButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
