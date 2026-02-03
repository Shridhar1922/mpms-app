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

export const LogInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Use the typed navigation hook
  const navigation = useNavigation();

  const handleLogin = (): void => {
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

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
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

  buttonWrapper: {
    marginTop: verticalScale(10),
  },

  button: {
    backgroundColor: '#0d6efd',
    paddingVertical: verticalScale(15),
    borderRadius: 6,
    width: '100%',
  },

  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: FontSize.S_12,
  },
});
