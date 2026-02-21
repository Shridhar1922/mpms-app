import { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import { CommonStyles, Spacing } from '../../styles/commonStyles';
import { FontFamily, FontSize } from '../../styles/typography';
import Images from '../../constants/Images';
import { horizontalScale, scale, verticalScale } from '../../styles/responsiveStyles';
import AppButton from '../../components/AppButton';
import { Screens } from '../../constants/Screens';
// import { useLoginMutation } from '../../redux/api/auth.api';

export const LogInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  // const [loginMutation, { isLoading, isSuccess, isError, data }] = useLoginMutation();

  // Use the typed navigation hook
  const navigation = useNavigation();

  const handleLogin = async () => {
    const payload = { email: email, password: password };
    navigation.navigate(Screens.Main.TABS, { screen: Screens.Main.DASHBOARD });
    // try {
    //   // setLoading(true);
    //   const response = await loginMutation(payload);

    //   console.log('response', response);

    //   if (response?.data?.success) {
    //     setLoading(false);
    //     Alert.alert('Login successfull');
    //   }
    // } catch (e: any) {
    //   setLoading(false);
    //   Alert.alert('error: ', e);
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
const styles = StyleSheet.create({
  logo: {
    width: scale(100),
    height: verticalScale(100),
  },
  title: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    fontSize: FontSize.REG_16,
  },
  subtitle: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: FontSize.XS_8,
  },

  form: {
    marginVertical: verticalScale(20),
    width: '100%',
  },

  inputGroup: {
    marginBottom: verticalScale(10),
  },
});
