import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Screens } from '../../constants/Screens';
// Employer screens
import { DashboardScreen as EmployerDashboardScreen } from '../../screens/employer/dashboard/DashboardScreen';
import { ProfileScreen as EmployerProfileScreen } from '../../screens/employer/profile/ProfileScreen';
import { SettingsScreen as EmployerSettingsScreen } from '../../screens/employer/settings/SettingsScreen';
import { ServicesScreen as EmployerServicesScreen } from '../../screens/employer/services/ServicesScreen';
// Employee screens
import { DashboardScreen as EmployeeDashboardScreen } from '../../screens/employee/dashboard/DashboardScreen';
import { ProfileScreen as EmployeeProfileScreen } from '../../screens/employee/profile/ProfileScreen';
import { SettingsScreen as EmployeeSettingsScreen } from '../../screens/employee/settings/SettingsScreen';
import { ServicesScreen as EmployeeServicesScreen } from '../../screens/employee/services/ServicesScreen';
import { CustomBottomTabs } from './customTabs/CustomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../constants/StaticData';

const Tab = createBottomTabNavigator();

const renderTabBar = (props: BottomTabBarProps) => <CustomBottomTabs {...props} />;

const BottomTabNavigation = () => {
  const [isEmployee, setIsEmployee] = useState<Boolean>(false);
  // load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem(USER_INFO.USER);
        if (json) {
          setIsEmployee(JSON.parse(json).roles[0].name === 'EMPLOYEE');
        }
      } catch (e) {
        console.warn('Failed to load user from storage', e);
      }
    };
    loadUser();
  }, []);

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

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={renderTabBar} // ✅ stable reference
    >
      {TabList.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ tabBarLabel: tab.label }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
