import { View, Text } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/CommonHeader/CommonHeader';

export const DashboardScreen = () => {
  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Dashboard" />
      <View>
        <Text>Dashboard Screen</Text>
      </View>
    </View>
  );
};
