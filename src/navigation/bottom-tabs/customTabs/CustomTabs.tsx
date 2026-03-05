import { NavigationHelpers, TabNavigationState } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Screens } from '../../../constants/Screens';
import { FontFamily } from '../../../styles/typography';
import { Colors } from '../../../styles/colors';
import { CommonStyles } from '../../../styles/commonStyles';
import Images from '../../../constants/Images';
import { styles } from './CustomTabs.styles';

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
