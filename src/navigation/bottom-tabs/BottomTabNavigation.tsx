import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Screens } from '../../constants/Screens';
import { DashboardScreen } from '../../screens/employer/dashboard/DashboardScreen';
import { ProfileScreen } from '../../screens/employer/profile/ProfileScreen';
import { SettingsScreen } from '../../screens/employer/settings/SettingsScreen';
import { ServicesScreen } from '../../screens/employer/services/ServicesScreen';
import { CustomBottomTabs } from './CustomTabs';

const Tab = createBottomTabNavigator();

const renderTabBar = (props: BottomTabBarProps) => <CustomBottomTabs {...props} />;

const TabList = [
  { name: Screens.Main.DASHBOARD, component: DashboardScreen, label: 'Dashboard' },
  { name: Screens.Main.SERVICES, component: ServicesScreen, label: 'Services' },
  { name: Screens.Main.PROFILE, component: ProfileScreen, label: 'Profile' },
  { name: Screens.Main.SETTINGS, component: SettingsScreen, label: 'Settings' },
];

const BottomTabNavigation = () => {
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
