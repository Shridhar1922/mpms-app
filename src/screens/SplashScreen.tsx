import { useNavigation } from '@react-navigation/native';
import { Screens } from '../constants/Screens';
import { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CommonStyles } from '../styles/commonStyles';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(Screens.Main.HOME);
    }, 2500);
  }, []);

  return (
    <View style={[CommonStyles.container, CommonStyles.center]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    width: '30%',
    height: '30%',
  },
});
