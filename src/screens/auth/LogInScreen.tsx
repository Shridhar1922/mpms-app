import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import CustomInput from '../../components/customeInput/CustomInput';
import { CommonStyles, Spacing } from '../../styles/commonStyles';
import Images from '../../constants/Images';
import { horizontalScale } from '../../styles/responsiveStyles';
import AppButton from '../../components/appButton/AppButton';
import { Screens } from '../../constants/Screens';
import { styles } from './LogInScreen.styles';
import { useLoginMutation } from '../../redux/api/auth.api';
import { useToast } from '../../components/toast/ToastContext/ToastContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../constants/StaticData';
import { setCredentials } from '../../redux/slices/authSlice';

export const LogInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loginMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Use the typed navigation hook
  const navigation = useNavigation();

  const validateForm = (): boolean => {
    // Check email
    if (!email || email.trim().length === 0) {
      showToast('Please enter your email', 'error');
      return false;
    }

    if (!email.includes('@')) {
      showToast('Please enter a valid email', 'error');
      return false;
    }

    // Check password
    if (!password || password.trim().length === 0) {
      showToast('Please enter your password', 'error');
      return false;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    // Validate form before API call
    if (!validateForm()) {
      return;
    }

    const payload = { email: email.trim(), password: password };

    // navigation.navigate(Screens.Main.TABS, { screen: Screens.Main.DASHBOARD });
    try {
      setLoading(true);
      const response = await loginMutation(payload).unwrap();

      console.log('response', response);

      if (response?.success) {
        showToast('Log in successfully!', 'success');
        await AsyncStorage.setItem(USER_INFO.REFRESH, response.data.refreshToken);
        await AsyncStorage.setItem(USER_INFO.TOKEN, response.data.accessToken);
        await AsyncStorage.setItem(
          USER_INFO.USER,
          JSON.stringify({ ...response.data.user, employeeId: response.data.employeeId })
        );
        dispatch(setCredentials({ user: response.data.user, token: response.data.accessToken }));
        setLoading(false);
        navigation.navigate(Screens.Main.TABS, { screen: Screens.Main.DASHBOARD });
      }
    } catch (e: any) {
      setLoading(false);
      console.log('====================================');
      console.log('e', e);
      console.log('====================================');
      showToast(e.error, 'error');
    }
  };

  return (
    <View
      style={[
        CommonStyles.container,
        CommonStyles.center,
        { paddingHorizontal: horizontalScale(16) },
      ]}
    >
      <View style={[Spacing.mV(20)]}>
        <Image source={Images.logo} style={[styles.logo]} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Please login to your account</Text>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <CustomInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            // Custom error handling example:
            error={email.length > 0 && !email.includes('@') ? 'Invalid email' : undefined}
          />
        </View>

        <View style={styles.inputGroup}>
          <CustomInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <AppButton title="Login" onPress={handleLogin} loading={loading} />

        <AppButton
          title="Create Account"
          variant="outline"
          onPress={() => console.log('Navigate to Register')}
        />
      </View>
    </View>
  );
};
