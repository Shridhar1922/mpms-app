import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Screens } from '../../constants/Screens';
// Employer screens
import { DashboardScreen as EmployerDashboardScreen } from '../../screens/employer/dashboard/DashboardScreen';
import { ServicesScreen as EmployerServicesScreen } from '../../screens/employer/services/ServicesScreen';
import { ProfileScreen as EmployerProfileScreen } from '../../screens/employer/profile/ProfileScreen';
import { SettingsScreen as EmployerSettingsScreen } from '../../screens/employer/settings/SettingsScreen';
// Employee screens
import { DashboardScreen as EmployeeDashboardScreen } from '../../screens/employee/dashboard/DashboardScreen';
import { ServicesScreen as EmployeeServicesScreen } from '../../screens/employee/services/ServicesScreen';
import { ProfileScreen as EmployeeProfileScreen } from '../../screens/employee/profile/ProfileScreen';
import { SettingsScreen as EmployeeSettingsScreen } from '../../screens/employee/settings/SettingsScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../constants/StaticData';
import { UserType } from '../../constants/types';
import { styles } from './CustomDrawerContent.styles';

export const CustomDrawerContent = (props: any) => {
  const [isEmployee, setIsEmployee] = useState<Boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  // load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem(USER_INFO.USER);
        if (json) {
          console.log('JSON.parse(json).roles.name', JSON.parse(json).roles[0].name);

          setIsEmployee(JSON.parse(json).roles[0].name === 'EMPLOYEE');
          setUser(JSON.parse(json));
        }
      } catch (e) {
        console.warn('Failed to load user from storage', e);
      }
    };
    loadUser();
  }, []);

  console.log('isEmployee..............', isEmployee);

  const TabList = isEmployee
    ? [
        { name: Screens.Main.DASHBOARD, component: EmployeeDashboardScreen, label: 'Dashboard' },
        { name: Screens.Main.SERVICES, component: EmployeeServicesScreen, label: 'Services' },
        { name: Screens.Main.PROFILE, component: EmployeeProfileScreen, label: 'Profile' },
        { name: Screens.Main.SETTINGS, component: EmployeeSettingsScreen, label: 'Settings' },
      ]
    : [
        { name: Screens.Main.DASHBOARD, component: EmployerDashboardScreen, label: 'Dashboard' },
        { name: Screens.Main.SERVICES, component: EmployerServicesScreen, label: 'Services' },
        { name: Screens.Main.PROFILE, component: EmployerProfileScreen, label: 'Profile' },
        { name: Screens.Main.SETTINGS, component: EmployerSettingsScreen, label: 'Settings' },
      ];

  console.log('TabList', TabList);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Text style={styles.userName}>{user ? user?.name : ''}</Text>
        <Text style={styles.userEmail}>{user ? user?.email : ''}</Text>
      </View>

      {TabList.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('BottomTabs', { screen: tab.name })}
        >
          <Text style={styles.drawerText}>{tab.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          await AsyncStorage.clear();
          props.navigation.navigate(Screens.Auth.LOGIN);
        }}
      >
        <Text style={[styles.drawerText, styles.colorRed]}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};
