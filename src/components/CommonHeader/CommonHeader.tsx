import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { styles } from './CommonHeader.styles';
import Images from '../../constants/Images';

type Props = {
  title?: string;
  showBackBtn?: boolean;
};

export const CommonHeader = ({ title, showBackBtn = false }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() =>
          showBackBtn ? navigation.goBack() : navigation.dispatch(DrawerActions.openDrawer())
        }
        style={styles.menuBtn}
      >
        <Image
          source={showBackBtn ? Images.backIcon : Images.menuIcon}
          style={[styles.modalImg]}
          resizeMode="contain"
        />

        {/* <Text style={styles.menuText}>{showBackBtn ? '←' : '☰'}</Text> */}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.w40} />
    </View>
  );
};
