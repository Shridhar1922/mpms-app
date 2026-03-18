import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import { AttendanceCalendar } from '../../../components/dashboardComponents';
import {
  type CheckInOutRecord,
  type Announcement,
  type Holiday,
} from '../../../redux/slices/dashboardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { styles } from './AttendanceScreen.styles';

export const AttendanceScreen = () => {
  const { checkInOutRecords, currentDayCheckedIn, currentDayCheckedOut, announcements, holidays } =
    useSelector((state: RootState) => state.dashboard);

  // Get today's record
  const today = new Date().toISOString().split('T')[0];

  // Calculate present and absent days
  const presentDays = checkInOutRecords.filter(
    (record) => record.attendanceStatus === 'present'
  ).length;
  const absentDays = checkInOutRecords.filter(
    (record) => record.attendanceStatus === 'absent'
  ).length;

  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Attendance" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Custom Stats Display */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Attendance Summary</Text>
          <View style={styles.statsRow}>
            {/* Present Days Box */}
            <View style={styles.statItem}>
              <View style={[styles.statCircle, styles.presentCircle]}>
                <Text style={styles.statValue}>{presentDays}</Text>
              </View>
              <Text style={styles.statLabel}>Present Days</Text>
            </View>

            {/* Absent Days Box */}
            <View style={styles.statItem}>
              <View style={[styles.statCircle, styles.absentCircle]}>
                <Text style={styles.statValue}>{absentDays}</Text>
              </View>
              <Text style={styles.statLabel}>Absent Days</Text>
            </View>
          </View>
        </View>

        {/* Attendance Calendar */}
        <AttendanceCalendar
          checkInOutRecords={checkInOutRecords}
          holidays={holidays}
          todayDate={today}
        />
      </ScrollView>
    </View>
  );
};
