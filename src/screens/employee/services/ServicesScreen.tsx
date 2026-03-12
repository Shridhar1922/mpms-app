import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import { styles } from './Services.styles';
import Images from '../../../constants/Images';

export const ServicesScreen = () => {
  const services = [
    { title: 'Attendance', icon: Images.attendanceIcon },
    { title: 'Leave', icon: Images.leaveIcon },
    { title: 'Regularization', icon: Images.regularizationIcon },
    { title: 'My Profile', icon: Images.attendanceIcon },
    { title: 'HR Letters', icon: Images.letterIcon },
    { title: 'My Files', icon: Images.myFilesIcon },
    { title: 'Support', icon: Images.supportIcon },
  ];

  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Services" />

      <View style={styles.gridContainer}>
        {services.map((item, index) => (
          <View key={index} style={styles.serviceButtonContainer}>
            <View>
              <TouchableOpacity style={styles.serviceButton}>
                <Image source={item.icon} style={styles.icon} resizeMode="contain" />
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
