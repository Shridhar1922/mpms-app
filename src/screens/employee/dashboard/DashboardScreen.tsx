import { View, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import {
  CheckInOutCard,
  AnnouncementsList,
  HolidaysList,
  AttendanceCalendar,
} from '../../../components/dashboardComponents';
import {
  checkIn,
  checkOut,
  setAnnouncements,
  setHolidays,
  addCheckInOutRecord,
  type CheckInOutRecord,
  type Announcement,
  type Holiday,
} from '../../../redux/slices/dashboardSlice';
import { RootState } from '../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../../constants/StaticData';
import { UserType } from '../../../constants/types';
import { useGetHolidaysQuery } from '../../../redux/api/dashboard.api';

export const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { checkInOutRecords, currentDayCheckedIn, currentDayCheckedOut, announcements, holidays } =
    useSelector((state: RootState) => state.dashboard);
  const [user, setUser] = useState<UserType | null>(null);

  // Fetch holidays from API
  const { data: holidaysData, isLoading: holidaysLoading } = useGetHolidaysQuery(undefined);

  // load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem(USER_INFO.USER);
        if (json) {
          setUser(JSON.parse(json));
        }
      } catch (e) {
        console.warn('Failed to load user from storage', e);
      }
    };
    loadUser();
  }, []);
  console.log('user.....', user);
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

      // Mock check-in/check-out records for past days
      const mockRecords: CheckInOutRecord[] = [
        {
          date: '2026-02-28',
          checkInTime: '09:15',
          checkOutTime: '18:30',
          status: 'checked-out',
          attendanceStatus: 'present',
        },
        {
          date: '2026-03-01',
          checkInTime: '09:00',
          checkOutTime: '18:15',
          status: 'checked-out',
          attendanceStatus: 'present',
        },
        {
          date: '2026-03-02',
          checkInTime: '09:30',
          checkOutTime: '19:00',
          status: 'checked-out',
          attendanceStatus: 'present',
        },
        {
          date: '2026-03-03',
          status: 'absent',
          attendanceStatus: 'absent',
        },
        {
          date: '2026-03-04',
          checkInTime: '10:00',
          checkOutTime: '14:00',
          status: 'checked-out',
          attendanceStatus: 'half-day',
        },
        {
          date: '2026-03-07',
          status: 'absent',
          attendanceStatus: 'weekly-off',
        },
        {
          date: '2026-03-11',
          status: 'absent',
          attendanceStatus: 'leave',
        },
        {
          date: '2026-03-12',
          status: 'absent',
          attendanceStatus: 'leave',
        },
      ];

      dispatch(setAnnouncements(mockAnnouncements));

      // Add mock records to Redux
      mockRecords.forEach((record) => {
        dispatch(addCheckInOutRecord(record));
      });
    };

    loadMockData();
  }, [dispatch]);

  // Load holidays from API
  useEffect(() => {
    if (holidaysData?.data?.items.length > 0) {
      // Transform API data to match Holiday interface
      const transformedHolidays = holidaysData?.data?.items.map((holiday: any) => ({
        id: holiday.id || Math.random().toString(),
        name: holiday.name || '',
        date: holiday.date || '',
        description: holiday.description || '',
      }));
      dispatch(setHolidays(transformedHolidays));
    }
  }, [holidaysData, dispatch]);

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

  const nowDate = new Date();
  const weekday = nowDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dd = String(nowDate.getDate()).padStart(2, '0');
  const mm = String(nowDate.getMonth() + 1).padStart(2, '0');
  const yyyy = nowDate.getFullYear();
  const formattedDate = `${weekday} - ${dd}/${mm}/${yyyy}`;

  return (
    <View style={[CommonStyles.container]}>
      <CommonHeader title="Dashboard" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Check In / Check Out Card */}
        <CheckInOutCard
          userName={user ? user?.name : ''}
          currentDateStr={formattedDate}
          shiftName="General"
          shiftTime="10:00 TO 19:00"
          currentDayCheckedIn={currentDayCheckedIn}
          currentDayCheckedOut={currentDayCheckedOut}
          currentCheckInTime={todayRecord?.checkInTime}
          currentCheckOutTime={todayRecord?.checkOutTime}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />

        {/* Attendance Calendar */}
        <AttendanceCalendar
          checkInOutRecords={checkInOutRecords}
          holidays={holidays}
          todayDate={today}
        />

        {/* Announcements List */}
        <AnnouncementsList announcements={announcements} />
        {/* Upcoming Holidays */}
        <HolidaysList holidays={holidays} />
      </ScrollView>
    </View>
  );
};
