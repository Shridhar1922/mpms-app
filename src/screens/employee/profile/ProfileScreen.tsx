import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './ProfileScreen.styles';
import { quickActions } from '../../../constants/ProfileData';
import { Screens } from '../../../constants/Screens';

export const ProfileScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=8' }} style={styles.avatar} />

        <Text style={styles.name}>Shridhar Bandgar</Text>
        <Text style={styles.role}>React Native Developer</Text>
      </View>

      {/* QUICK STATS */}
      {/* <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Total Leaves</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Used Leaves</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Balance Leaves</Text>
        </View>
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pB30}
        style={styles.scrollContainer}
      >
        {/* EMPLOYEE INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Employee Info</Text>

          <View style={styles.row}>
            <View style={styles.w48}>
              <Text style={styles.label}>Employee ID</Text>
              <Text style={styles.value}>EMP1024</Text>
            </View>
            <View style={styles.w48}>
              <Text style={styles.label}>Joining Date</Text>
              <Text style={styles.value}>01/01/2020</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.w48}>
              <Text style={styles.label}>Department</Text>
              <Text style={styles.value}>Mobile Development</Text>
            </View>
            <View style={styles.w48}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>+91 9876543210</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.w48}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>shridhar@company.com</Text>
            </View>
            <View style={styles.w48}>
              <Text style={styles.label}>Date Of Birth</Text>
              <Text style={styles.value}>01/01/1990</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.w48}>
              <Text style={styles.label}>Country</Text>
              <Text style={styles.value}>India</Text>
            </View>
            <View style={styles.w48}>
              <Text style={styles.label}>State</Text>
              <Text style={styles.value}>Maharashtra</Text>
            </View>
          </View>

          <View style={styles.w100}>
            <Text style={styles.label}>Current Address</Text>
            <Text style={styles.value}>-</Text>
          </View>
          <View style={styles.w100}>
            <Text style={styles.label}>Permanent Address</Text>
            <Text style={styles.value}>-</Text>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          {quickActions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.actionBtn}
              onPress={() => navigation.navigate(Screens.Main.EDIT_PROFILE)}
            >
              <Image source={item.icon} style={styles.icon} resizeMode="contain" />
              <Text style={styles.actionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
