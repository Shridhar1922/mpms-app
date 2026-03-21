import { NavigationHelpers, TabNavigationState } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { useEffect, useState } from 'react';

import { Screens } from '../../../constants/Screens';
import { FontFamily } from '../../../styles/typography';
import { Colors } from '../../../styles/colors';
import { CommonStyles } from '../../../styles/commonStyles';
import Images from '../../../constants/Images';
import { styles } from './CustomTabs.styles';
import { USER_INFO } from '../../../constants/StaticData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CustomBottomTabs = ({
  state,
  descriptors,
  navigation,
}: {
  state: TabNavigationState<any>;
  descriptors: any;
  navigation: NavigationHelpers<any, any>;
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  useEffect(() => {
    console.log('CustomBottomTabs useEffect called');
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem(USER_INFO.USER);
        console.log('json...........', json);

        if (json) {
          setIsEmployee(JSON.parse(json).roles[0].name === 'EMPLOYEE');
        }
      } catch (e) {
        console.warn('Failed to load user from storage', e);
      }
    };
    loadUser();
  }, []);

  console.log('CustomBottomTabs isEmployee', isEmployee);

  const TabList = isEmployee
    ? [
        { name: Screens.Services.APPLY_LEAVE, component: '', label: 'Apply Leave' },
        { name: Screens.Services.ATTENDANCE_REQUEST, component: '', label: 'Attendance Request' },
      ]
    : [
        { name: Screens.Services.ADD_EMPLOYEE, component: '', label: 'Add Employee' },
        { name: Screens.Services.ADD_HOLIDAY, component: '', label: 'Add Holiday' },
      ];

  return (
    <>
      <View style={[CommonStyles.row, styles.tabContainer]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const color = isFocused ? Colors.blue : Colors.dimgray;
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? route.name;

          let iconSource;

          if (route.name === Screens.Main.DASHBOARD) iconSource = Images.home;
          else if (route.name === Screens.Main.SERVICES) iconSource = Images.search;
          else if (route.name === Screens.Main.PROFILE) iconSource = Images.user;
          else if (route.name === Screens.Main.SETTINGS) iconSource = Images.more;

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

        {/* PLUS BUTTON */}
        <TouchableOpacity style={styles.plusButton} onPress={() => setMenuVisible(true)}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL MENU */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.modalMenu}>
            {TabList.map((item) => (
              <TouchableOpacity key={item.name} style={styles.menuItem}>
                <Image source={Images.home} style={[styles.modalImg]} resizeMode="contain" />
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
