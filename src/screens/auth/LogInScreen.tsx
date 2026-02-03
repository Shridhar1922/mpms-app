import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../constants/Screens';
import CustomInput from '../../components/CustomInput';
import { CommonStyles, Spacing } from '../../styles/commonStyles';
import { FontFamily, FontSize } from '../../styles/typography';
import Images from '../../constants/Images';
import { scale, verticalScale } from '../../styles/responsiveStyles';
import { Colors } from '../../styles/colors';
import AppButton from '../../components/AppButton';

export const LogInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Use the typed navigation hook
  const navigation = useNavigation();

  const handleLogin = (): void => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => setLoading(false), 2000);
    Alert.alert('Error', 'Please enter email and password');
    // navigation.navigate(Screens.Main.USER_LIST);
    return;
  };

  return (
    <View style={[CommonStyles.container, CommonStyles.center]}>
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
