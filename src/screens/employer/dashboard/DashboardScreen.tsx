import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import {
  StatsCard,
  NotificationList,
  NotificationItemType,
} from '../../../components/dashboardComponents';
import { moderateScale, scale, verticalScale } from '../../../styles/responsiveStyles';

export const DashboardScreen = () => {
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });
  const [notifications, setNotifications] = useState<NotificationItemType[]>([]);

  useEffect(() => {
    // mock data for cards
    setStats({ total: 120, present: 98, absent: 22 });

    // mock notifications
    setNotifications([
      {
        id: '1',
        title: 'Payroll Processed',
        message: 'March salaries have been disbursed to all employees.',
        date: '2026-03-04',
      },
      {
        id: '2',
        title: 'System Update',
        message: 'Scheduling module updated to version 2.1 with bug fixes.',
        date: '2026-03-03',
      },
      {
        id: '3',
        title: 'New Hire Orientation',
        message: 'Orientation for new employees scheduled on 10th March.',
        date: '2026-03-02',
      },
    ]);
  }, []);

  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Dashboard" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* statistics cards */}
        <View style={localStyles.statsContainer}>
          <StatsCard title="Total Employees" value={stats.total} />
          <StatsCard title="Present Employees" value={stats.present} />
          <StatsCard title="Absent Employees" value={stats.absent} />
        </View>

        {/* notifications list */}
        <NotificationList notifications={notifications} />
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(20),
  },
});
