import { View, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/CommonHeader/CommonHeader';
import {
  CheckInOutCard,
  Calendar,
  AnnouncementsList,
  HolidaysList,
} from '../../../components/DashboardComponents';
import {
  checkIn,
  checkOut,
  setAnnouncements,
  setHolidays,
  type CheckInOutRecord,
  type Announcement,
  type Holiday,
} from '../../../redux/slices/dashboardSlice';
import { RootState } from '../../../redux/store';

export const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { checkInOutRecords, currentDayCheckedIn, currentDayCheckedOut, announcements, holidays } =
    useSelector((state: RootState) => state.dashboard);

  // Get today's record
  const today = new Date().toISOString().split('T')[0];
  const todayRecord = checkInOutRecords.find((record) => record.date === today);

  // Load mock data on component mount
  useEffect(() => {
    const loadMockData = () => {
      // Mock announcements
      const mockAnnouncements: Announcement[] = [
        {
          id: '1',
          title: 'Office Closure',
          content: 'Office will be closed on March 15, 2026 due to maintenance.',
          date: '2026-03-04',
          priority: 'high',
        },
        {
          id: '2',
          title: 'Team Meeting',
          content: 'All-hands meeting scheduled for March 10, 2026 at 10 AM.',
          date: '2026-03-03',
          priority: 'medium',
        },
        {
          id: '3',
          title: 'New Benefits Package',
          content: 'Check out the new health and wellness benefits available to all employees.',
          date: '2026-02-28',
          priority: 'low',
        },
      ];

      // Mock holidays
      const mockHolidays: Holiday[] = [
        {
          id: '1',
          name: 'Holi',
          date: '2026-03-14',
          description: 'Festival of Colors - Regional Holiday',
        },
        {
          id: '2',
          name: 'Good Friday',
          date: '2026-04-10',
          description: 'National Holiday',
        },
        {
          id: '3',
          name: 'Easter Monday',
          date: '2026-04-13',
          description: 'Regional Holiday',
        },
        {
          id: '4',
          name: 'Eid ul-Fitr',
          date: '2026-04-02',
          description: 'Islamic Holiday',
        },
        {
          id: '5',
          name: 'Labour Day',
          date: '2026-05-01',
          description: 'National Holiday',
        },
      ];

      // Mock check-in/check-out records for past days
      const mockRecords: CheckInOutRecord[] = [
        { date: '2026-02-28', checkInTime: '09:15', checkOutTime: '18:30', status: 'checked-out' },
        { date: '2026-03-01', checkInTime: '09:00', checkOutTime: '18:15', status: 'checked-out' },
        { date: '2026-03-02', checkInTime: '09:30', checkOutTime: '19:00', status: 'checked-out' },
      ];

      dispatch(setAnnouncements(mockAnnouncements));
      dispatch(setHolidays(mockHolidays));

      // Add mock records to Redux
      mockRecords.forEach((record) => {
        // This approach works by using the addCheckInOutRecord action
        // We need to set them through state initialization
      });
    };

    loadMockData();
  }, [dispatch]);

  const handleCheckIn = () => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    dispatch(
      checkIn({
        date: today,
        time,
      })
    );

    Alert.alert('Success', `Checked in at ${time}`, [{ text: 'OK' }]);
  };

  const handleCheckOut = () => {
    if (!currentDayCheckedIn) {
      Alert.alert('Error', 'Please check in first before checking out', [{ text: 'OK' }]);
      return;
    }

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    dispatch(
      checkOut({
        date: today,
        time,
      })
    );

    Alert.alert('Success', `Checked out at ${time}`, [{ text: 'OK' }]);
  };

  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Dashboard" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Check In / Check Out Card */}
        <CheckInOutCard
          currentDayCheckedIn={currentDayCheckedIn}
          currentDayCheckedOut={currentDayCheckedOut}
          currentCheckInTime={todayRecord?.checkInTime}
          currentCheckOutTime={todayRecord?.checkOutTime}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />

        {/* Calendar with Highlights */}
        <Calendar
          checkInOutRecords={checkInOutRecords}
          onDateSelect={(date) => {
            const record = checkInOutRecords.find((r) => r.date === date);
            if (record) {
              Alert.alert(
                'Attendance Details',
                `Date: ${date}\nCheck In: ${record.checkInTime || 'N/A'}\nCheck Out: ${record.checkOutTime || 'N/A'}`
              );
            }
          }}
        />

        {/* Announcements List */}
        <AnnouncementsList announcements={announcements} />

        {/* Holidays List */}
        <HolidaysList holidays={holidays} />
      </ScrollView>
    </View>
  );
};
