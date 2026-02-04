import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../constants/Screens';
import { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CommonStyles } from '../../styles/commonStyles';
import Images from '../../constants/Images';
import { scale, verticalScale } from '../../styles/responsiveStyles';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(Screens.Auth.LOGIN);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[CommonStyles.container, CommonStyles.center]}>
      <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    width: scale(100),
    height: verticalScale(100),
  },
});
