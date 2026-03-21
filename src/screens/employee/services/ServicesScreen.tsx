import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import { styles } from './Services.styles';
import Images from '../../../constants/Images';
import { Screens } from '../../../constants/Screens';

export const ServicesScreen = ({ navigation }: { navigation: any }) => {
  const services = [
    { title: 'Attendance', icon: Images.attendanceIcon },
    { title: 'Regularization', icon: Images.regularizationIcon },
    { title: 'Leave', icon: Images.leaveIcon },
    { title: 'Holiday', icon: Images.holidayIcon },
    { title: 'My Profile', icon: Images.attendanceIcon },
    { title: 'HR Letters', icon: Images.letterIcon },
    { title: 'My Files', icon: Images.myFilesIcon },
    { title: 'Organization', icon: Images.organizationIcon },
    { title: 'Support', icon: Images.supportIcon },
  ];

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
                  onPress={() => {
                    if (item.title === 'Attendance') {
                      navigation.navigate(Screens.Services.ATTENDANCE_REQUEST);
                    }
                  }}
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
