import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../constants/Screens';
import { useCallback, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CommonStyles } from '../../styles/commonStyles';
import Images from '../../constants/Images';
import { scale, verticalScale } from '../../styles/responsiveStyles';
import { useRefreshTokenMutation } from '../../redux/api/auth.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../constants/StaticData';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [refreshTokenMutation] = useRefreshTokenMutation();

  const initializeApp = useCallback(async () => {
    try {
      const refreshToken = await AsyncStorage.getItem(USER_INFO.REFRESH);
      if (!refreshToken) {
        navigation.navigate(Screens.Auth.LOGIN);
        return;
      }

      const response = await refreshTokenMutation({
        refreshToken,
      }).unwrap();

      if (response?.success) {
        await AsyncStorage.setItem(USER_INFO.REFRESH, response.data.refreshToken);
        await AsyncStorage.setItem(USER_INFO.TOKEN, response.data.accessToken);
        navigation.navigate(Screens.Main.TABS, { screen: Screens.Main.DASHBOARD });
      } else {
        navigation.navigate(Screens.Auth.LOGIN);
      }
    } catch {
      await AsyncStorage.clear();
      navigation.navigate(Screens.Auth.LOGIN);
    }
  }, [refreshTokenMutation]);
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

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
