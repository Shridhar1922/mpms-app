import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import { styles } from './Services.styles';
import Images from '../../../constants/Images';
import { Screens } from '../../../constants/Screens';

type ServicesScreenNavigationProp = StackNavigationProp<any>;

export const ServicesScreen = () => {
  const navigation = useNavigation<ServicesScreenNavigationProp>();

  const services = [
    {
      title: 'My Employee',
      icon: Images.myEmployeeIcon,
      screenName: Screens.Services.MY_EMPLOYEES,
    },
    { title: 'Regularization', icon: Images.regularizationIcon },
    { title: 'Leave Tracker', icon: Images.leaveIcon },
    { title: 'Holiday', icon: Images.holidayIcon },
    { title: 'Announcements', icon: Images.announcementIcon },
    { title: 'My Profile', icon: Images.attendanceIcon },
    { title: 'Organization', icon: Images.organizationIcon },
    { title: 'Support', icon: Images.supportIcon },
  ];

  const handleServicePress = (screenName?: string) => {
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Services" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pB30}
        style={styles.scrollContainer}
      >
        <View style={styles.gridContainer}>
          {services.map((item, index) => (
            <View key={index} style={styles.serviceButtonContainer}>
              <View>
                <TouchableOpacity
                  style={styles.serviceButton}
                  onPress={() => handleServicePress(item.screenName)}
                >
                  <Image source={item.icon} style={styles.icon} resizeMode="contain" />
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
