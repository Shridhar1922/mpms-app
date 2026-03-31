import { View, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonStyles } from '../../../styles/commonStyles';
import { CommonHeader } from '../../../components/commonHeader/CommonHeader';
import {
  CheckInOutCard,
  HolidaysList,
  AttendanceCalendar,
} from '../../../components/dashboardComponents';
import {
  checkIn,
  checkOut,
  setAnnouncements,
  setHolidays,
  setCheckInOutRecords,
  CheckInOutRecord,
  AttendanceStatus,
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
  useLazyGetAttendancesByMonthQuery,
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
  const [getAttendancesByMonth, { data: monthlyAttendanceData }] =
    useLazyGetAttendancesByMonthQuery();

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
            const now = new Date();
            await getTodayAttendance({
              employeeId: userData.employeeId,
              date: now.toISOString(),
            });
            await getAttendancesByMonth({
              employeeId: userData.employeeId,
              year: now.getFullYear(),
              month: now.getMonth() + 1,
              limit: 31,
            });
          }
        }
      } catch (e) {
        console.warn('Failed to load user from storage', e);
      }
    };
    loadUser();
  }, [getTodayAttendance]);

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

  // Load mock announcements on component mount (no announcements API yet)
  useEffect(() => {
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
    dispatch(setAnnouncements(mockAnnouncements));
  }, [dispatch]);

  // Process monthly attendance data from API
  useEffect(() => {
    const items = monthlyAttendanceData?.data?.items;
    if (!items?.length) return;

    const mapAttendanceType = (
      type: string,
      isSessionActive: boolean
    ): { attendanceStatus: AttendanceStatus; status: CheckInOutRecord['status'] } => {
      switch (type) {
        case 'full_day':
          return { attendanceStatus: 'present', status: 'checked-out' };
        case 'half_day':
          return { attendanceStatus: 'half-day', status: 'checked-out' };
        case 'absent':
          return { attendanceStatus: 'absent', status: 'absent' };
        case 'present':
        default:
          return {
            attendanceStatus: 'present',
            status: isSessionActive ? 'checked-in' : 'checked-out',
          };
      }
    };

    const records: CheckInOutRecord[] = items.map((item: any) => {
      const checkInDate = new Date(item.checkInAt);
      const date = checkInDate.toISOString().split('T')[0];
      const checkInTime = `${String(checkInDate.getHours()).padStart(2, '0')}:${String(checkInDate.getMinutes()).padStart(2, '0')}:${String(checkInDate.getSeconds()).padStart(2, '0')}`;

      let checkOutTime: string | undefined;
      if (item.checkOutAt) {
        const checkOutDate = new Date(item.checkOutAt);
        checkOutTime = `${String(checkOutDate.getHours()).padStart(2, '0')}:${String(checkOutDate.getMinutes()).padStart(2, '0')}:${String(checkOutDate.getSeconds()).padStart(2, '0')}`;
      }

      const { attendanceStatus, status } = mapAttendanceType(
        item.attendanceType,
        item.isSessionActive
      );

      return { date, checkInTime, checkOutTime, status, attendanceStatus };
    });

    dispatch(setCheckInOutRecords(records));
  }, [monthlyAttendanceData, dispatch]);

  // Load holidays from API
  useEffect(() => {
    if (holidaysData?.data?.items.length > 0) {
      // Transform API data to match Holiday interface
      const transformedHolidays = holidaysData?.data?.items.map((holiday: any) => {
        // Normalize date to YYYY-MM-DD format
        let normalizedDate = holiday.date || '';
        if (normalizedDate) {
          const dateObj = new Date(normalizedDate);
          if (!isNaN(dateObj.getTime())) {
            normalizedDate = dateObj.toISOString().split('T')[0];
          }
        }

        return {
          id: holiday.id || Math.random().toString(),
          name: holiday.name || '',
          date: normalizedDate,
          description: holiday.description || '',
        };
      });

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
          employeeId={user?.employeeId || ''}
          onMonthChange={(records) => dispatch(setCheckInOutRecords(records))}
        />

        {/* Announcements List */}
        {/* <AnnouncementsList announcements={announcements} /> */}
        {/* Upcoming Holidays */}
        <HolidaysList holidays={holidays} type="upcoming" />
      </ScrollView>
    </View>
  );
};
