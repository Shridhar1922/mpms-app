import { View, Text } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';

export const SettingsScreen = () => {
  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Settings" />
      <View>
        <Text>emp Settings Screen</Text>
      </View>
    </View>
  );
};
