import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { styles } from './CommonHeader.styles';

type Props = {
  title: string;
};

export const CommonHeader = ({ title }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuBtn}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.w40} />
    </View>
  );
};
