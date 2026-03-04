import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Screens } from '../../constants/Screens';
import { DashboardScreen } from '../../screens/employer/dashboard/DashboardScreen';
import { ServicesScreen } from '../../screens/employer/services/ServicesScreen';
import { ProfileScreen } from '../../screens/employer/profile/ProfileScreen';
import { SettingsScreen } from '../../screens/employer/settings/SettingsScreen';

export const CustomDrawerContent = (props: any) => {
  const TabList = [
    { name: Screens.Main.DASHBOARD, component: DashboardScreen, label: 'Dashboard' },
    { name: Screens.Main.SERVICES, component: ServicesScreen, label: 'Services' },
    { name: Screens.Main.PROFILE, component: ProfileScreen, label: 'Profile' },
    { name: Screens.Main.SETTINGS, component: SettingsScreen, label: 'Settings' },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Text style={styles.userName}>Shridhar</Text>
        <Text style={styles.userEmail}>shridhar@gmail.com</Text>
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

      <TouchableOpacity style={styles.drawerItem}>
        <Text style={[styles.drawerText, styles.colorRed]}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  userEmail: {
    fontSize: 14,
    color: '#f2f2f2',
    marginTop: 5,
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  colorRed: {
    color: 'red',
  },
});
