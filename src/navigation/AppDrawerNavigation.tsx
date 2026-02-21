import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

import BottomTabNavigation from './bottom-tabs/BottomTabNavigation';
import { CustomDrawerContent } from './drawer/CustomDrawerContent';

const Drawer = createDrawerNavigator();

// ✅ Typed props
const renderDrawerContent = (props: DrawerContentComponentProps) => (
  <CustomDrawerContent {...props} />
);

export const AppDrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={renderDrawerContent} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="BottomTabs" component={BottomTabNavigation} />
    </Drawer.Navigator>
  );
};
