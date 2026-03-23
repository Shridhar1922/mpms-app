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
  CheckInOutRecord,
  Announcement,
} from '../../../redux/slices/dashboardSlice';
import { RootState } from '../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO } from '../../../constants/StaticData';
import { UserType } from '../../../constants/types';
import {
  useGetHolidaysQuery,
  useLazyGetTodayAttendanceQuery,
  useCheckInMutation,
  useCheckOutMutation,
} from '../../../redux/api/dashboard.api';

export const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { checkInOutRecords, currentDayCheckedIn, currentDayCheckedOut, announcements, holidays } =
    useSelector((state: RootState) => state.dashboard);
  const [user, setUser] = useState<UserType | null>(null);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [checkOutLoading, setCheckOutLoading] = useState(false);
  const [todayAttendanceId, setTodayAttendanceId] = useState<string | null>(null);

  // API mutations
  const [checkInMutation] = useCheckInMutation();
  const [checkOutMutation] = useCheckOutMutation();
  const [getTodayAttendance, { data: todayAttendanceData }] = useLazyGetTodayAttendanceQuery();

  // Get today's date for the API call
  const today = new Date().toISOString().split('T')[0];

  // Fetch holidays from API
  const { data: holidaysData } = useGetHolidaysQuery(undefined);
  // load user from AsyncStorage and fetch attendance
  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem(USER_INFO.USER);
        if (json) {
          const userData = JSON.parse(json);
          setUser(userData);
          // Fetch attendance after user is loaded
          if (userData?.employeeId) {
            await getTodayAttendance({
              employeeId: userData.employeeId,
              date: new Date().toISOString(),
            });
          }
        }
      } catch (e) {
        console.warn('Failed to load user from storage', e);
      }
    };
    loadUser();
  }, [getTodayAttendance]);
  console.log('user.....', user);

  // Process today's attendance data from API
  useEffect(() => {
    if (todayAttendanceData) {
      const attendance = todayAttendanceData?.data;

      if (attendance.id) {
        setTodayAttendanceId(attendance.id);
      }

      // Extract checkInAt time if exists
      if (attendance.checkInAt) {
        const checkInDateTime = new Date(attendance.checkInAt);
        const checkInTime = `${String(checkInDateTime.getHours()).padStart(2, '0')}:${String(checkInDateTime.getMinutes()).padStart(2, '0')}:${String(checkInDateTime.getSeconds()).padStart(2, '0')}`;

        dispatch(
          checkIn({
            date: today,
            time: checkInTime,
          })
        );
      }

      // Extract checkOutAt time if exists
      if (attendance.checkOutAt) {
        const checkOutDateTime = new Date(attendance.checkOutAt);
        const checkOutTime = `${String(checkOutDateTime.getHours()).padStart(2, '0')}:${String(checkOutDateTime.getMinutes()).padStart(2, '0')}:${String(checkOutDateTime.getSeconds()).padStart(2, '0')}`;

        dispatch(
          checkOut({
            date: today,
            time: checkOutTime,
          })
        );
      }
    }
  }, [todayAttendanceData, dispatch, today]);

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
      console.log('Transformed Holidays...', transformedHolidays);
      dispatch(setHolidays(transformedHolidays));
    }
  }, [holidaysData, dispatch]);

  const handleCheckIn = async () => {
    if (!user?.employeeId) {
      Alert.alert('Error', 'User information not found. Please login again.', [{ text: 'OK' }]);
      return;
    }

    setCheckInLoading(true);
    try {
      const response = await checkInMutation({
        employeeId: user?.employeeId,
        attendanceType: 'present',
      }).unwrap();

      console.log('Check-in response:', response);
      if (response?.data?.id) {
        setTodayAttendanceId(response.data.id);
      }

      // Extract date and time from API response
      const checkInDateTime = new Date(response.data.checkInAt);
      const apiDate = checkInDateTime.toISOString().split('T')[0];
      const apiTime = `${String(checkInDateTime.getHours()).padStart(2, '0')}:${String(checkInDateTime.getMinutes()).padStart(2, '0')}:${String(checkInDateTime.getSeconds()).padStart(2, '0')}`;

      dispatch(
        checkIn({
          date: apiDate,
          time: apiTime,
        })
      );

      Alert.alert('Success', `Checked in at ${apiTime}`, [{ text: 'OK' }]);
    } catch (error: any) {
      console.error('Check-in failed:', error);
      Alert.alert('Error', error?.data?.message || 'Failed to check in. Please try again.', [
        { text: 'OK' },
      ]);
    } finally {
      setCheckInLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!todayAttendanceId) {
      Alert.alert('Error', 'No active check-in found. Please check in first.', [{ text: 'OK' }]);
      return;
    }

    setCheckOutLoading(true);
    try {
      const now = new Date();
      const checkOutAt = now.toISOString();

      const response = await checkOutMutation({
        attendanceId: todayAttendanceId,
        attendanceType: 'present',
        checkOutAt,
      }).unwrap();

      console.log('Check-out response:', response);

      // Extract date and time from API response
      const checkOutDateTime = new Date(response.data.checkOutAt);
      const apiDate = checkOutDateTime.toISOString().split('T')[0];
      const apiTime = `${String(checkOutDateTime.getHours()).padStart(2, '0')}:${String(checkOutDateTime.getMinutes()).padStart(2, '0')}:${String(checkOutDateTime.getSeconds()).padStart(2, '0')}`;

      dispatch(
        checkOut({
          date: apiDate,
          time: apiTime,
        })
      );

      Alert.alert('Success', 'Checked out successfully', [{ text: 'OK' }]);
    } catch (error: any) {
      console.error('Check-out failed:', error);
      Alert.alert('Error', error?.data?.message || 'Failed to check out. Please try again.', [
        { text: 'OK' },
      ]);
    } finally {
      setCheckOutLoading(false);
    }
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
          isCheckInLoading={checkInLoading}
          isCheckOutLoading={checkOutLoading}
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
