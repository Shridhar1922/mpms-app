import { NavigationHelpers, TabNavigationState } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Screens } from '../../constants/Screens';
import { FontFamily, FontSize } from '../../styles/typography';
import { scale, verticalScale } from '../../styles/responsiveStyles';
import { Colors } from '../../styles/colors';
import { CommonStyles } from '../../styles/commonStyles';
import Images from '../../constants/Images';

export const CustomBottomTabs = ({
  state,
  descriptors,
  navigation,
}: {
  state: TabNavigationState<any>;
  descriptors: any;
  navigation: NavigationHelpers<any, any>;
}) => {
  return (
    <View style={[CommonStyles.row, styles.tabContainer]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const color = isFocused ? Colors.blue : Colors.dimgray;

        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;

        let iconSource;

        if (route.name === Screens.Main.DASHBOARD) {
          iconSource = Images.home;
        } else if (route.name === Screens.Main.SERVICES) {
          iconSource = Images.search;
        } else if (route.name === Screens.Main.PROFILE) {
          iconSource = Images.user;
        } else if (route.name === Screens.Main.SETTINGS) {
          iconSource = Images.more;
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={[
              styles.tabItemContainer,
              CommonStyles.center,
              {
                borderTopWidth: isFocused ? 2 : 0,
                backgroundColor: isFocused ? Colors.offwhite : Colors.white,
              },
            ]}
            onPress={() => navigation.navigate(route.name)}
          >
            <Image
              source={iconSource}
              style={[styles.tabImage, { tintColor: color }]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.tabTitle,
                {
                  color,
                  fontFamily: isFocused
                    ? FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD
                    : FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    height: verticalScale(80),
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gainsboro,
  },
  tabItemContainer: {
    gap: 6,
    borderTopColor: Colors.blue,
    height: '100%',
    width: '25%',
  },
  tabImage: {
    width: scale(22),
    height: verticalScale(22),
  },
  tabTitle: {
    fontSize: FontSize.XS_8,
  },
});
