import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import {
  StatsCard,
  NotificationList,
  NotificationItemType,
} from '../../../components/dashboardComponents';
import { moderateScale, verticalScale } from '../../../styles/responsiveStyles';
import { useGetEmployeesQuery } from '../../../redux/api/employees.api';
import { setEmployees } from '../../../redux/slices/employeesSlice';
import { RootState } from '../../../redux/store';

export const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { data: employeesData, isLoading: employeesLoading } = useGetEmployeesQuery();
  const employeeCount = useSelector((state: RootState) => state.employees.total);
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });
  const [notifications, setNotifications] = useState<NotificationItemType[]>([]);

  useEffect(() => {
    if (employeesData?.data?.items && !employeesLoading) {
      const employeesList = Array.isArray(employeesData.data.items) ? employeesData.data.items : [];
      dispatch(setEmployees(employeesList));
      setStats((prevStats) => ({
        ...prevStats,
        total: employeesList.length,
      }));
    }
  }, [employeesData, employeesLoading, dispatch]);

  useEffect(() => {
    // Update stats with employee count from Redux
    if (employeeCount > 0) {
      setStats((prevStats) => ({
        ...prevStats,
        total: employeeCount,
      }));
    }
  }, [employeeCount]);

  useEffect(() => {
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
