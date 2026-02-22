import { View, Text } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/CommonHeader/CommonHeader';

export const ServicesScreen = () => {
  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Services" />
      <View>
        <Text>Services Screen</Text>
      </View>
    </View>
  );
};
