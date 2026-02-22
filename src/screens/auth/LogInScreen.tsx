import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomeInput/CustomInput';
import { CommonStyles, Spacing } from '../../styles/commonStyles';
import Images from '../../constants/Images';
import { horizontalScale } from '../../styles/responsiveStyles';
import AppButton from '../../components/AppButton/AppButton';
import { Screens } from '../../constants/Screens';
import { styles } from './LogInScreen.styles';
import { useLoginMutation } from '../../redux/api/auth.api';
import { useToast } from '../../components/Toast/ToastContext/ToastContext';

export const LogInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loginMutation, { isLoading, isSuccess, isError, data }] = useLoginMutation();
  const { showToast } = useToast();

  // Use the typed navigation hook
  const navigation = useNavigation();

  const handleLogin = async () => {
    const payload = { email: email, password: password };
    showToast('Log in successfully!', 'info');
    navigation.navigate(Screens.Main.TABS, { screen: Screens.Main.DASHBOARD });
    // try {
    //   setLoading(true);
    //   const response = await loginMutation(payload);

    //   console.log('response', response);

    //   if (response?.data?.success) {
    //     setLoading(false);
    //   }
    // } catch (e: any) {
    //   setLoading(false);
    // }
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
