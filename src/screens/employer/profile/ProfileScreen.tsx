import { View, Text } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/CommonHeader';

export const ProfileScreen = () => {
  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Profile" />
      <View>
        <Text>Profile Screen</Text>
      </View>
    </View>
  );
};
