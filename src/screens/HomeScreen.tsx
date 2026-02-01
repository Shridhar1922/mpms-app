import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../constants/Screens';

export const HomeScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Use the typed navigation hook
  const navigation = useNavigation();

  const handleLogin = (): void => {
   
      Alert.alert('Error', 'Please enter email and password');
      navigation.navigate(Screens.Main.USER_LIST);
      return;
   
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email or Username"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Password"
            style={styles.input}
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

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => {
              /* Navigate to Signup */
            }}
          >
            Create an Account
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },

  form: {
    marginTop: 16,
  },

  inputGroup: {
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
  },

  buttonWrapper: {
    marginTop: 16,
  },

  button: {
    backgroundColor: '#0d6efd',
    paddingVertical: 14,
    borderRadius: 6,
    width: '100%',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    marginTop: 40,
  },

  footerText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 14,
  },

  link: {
    fontWeight: '700',
    color: '#0d6efd',
  },
});
