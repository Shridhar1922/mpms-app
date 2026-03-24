import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './AttendanceCalendar.styles';
import { AttendanceStatus, CheckInOutRecord } from '../../../redux/slices/dashboardSlice';
import { Holiday } from '../../../redux/slices/dashboardSlice';
import { useLazyGetAttendancesByMonthQuery } from '../../../redux/api/dashboard.api';

interface AttendanceCalendarProps {
  checkInOutRecords: CheckInOutRecord[];
  holidays: Holiday[];
  todayDate?: string; // YYYY-MM-DD format
  employeeId: string;
  onMonthChange?: (records: CheckInOutRecord[]) => void;
}

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  record?: CheckInOutRecord;
  isHoliday: boolean;
  isToday: boolean;
}

const getStatusColor = (status: AttendanceStatus | undefined, isHoliday: boolean): string => {
  if (isHoliday) return '#FF6B6B'; // Holiday - Red
  switch (status) {
    case 'present':
      return '#51CF66'; // Green
    case 'absent':
      return '#FF8C8C'; // Light Red
    case 'weekly-off':
      return '#FFD93D'; // Yellow
    case 'leave':
      return '#6C5CE7'; // Purple
    case 'half-day':
      return '#74B9FF'; // Light Blue
    default:
      return '#E8E8E8'; // Gray for no data
  }
};

const getStatusLabel = (record: CheckInOutRecord | undefined, isHoliday: boolean): string => {
  if (isHoliday) return 'Holiday';
  if (!record) return '';

  switch (record.attendanceStatus) {
    case 'present':
      return 'Present';
    case 'absent':
      return 'Absent';
    case 'weekly-off':
      return 'W-Off';
    case 'leave':
      return 'Leave';
    case 'half-day':
      return 'Half Day';
    default:
      return record.status === 'checked-out' ? 'Present' : '';
  }
};

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  checkInOutRecords,
  holidays,
  todayDate,
  employeeId,
  onMonthChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [getAttendancesByMonth] = useLazyGetAttendancesByMonthQuery();

  console.log('Rendering AttendanceCalendar with records:', checkInOutRecords);
  console.log('Holidays:', holidays);
  console.log('Today Date:', todayDate);
  const generateCalendarDays = (): CalendarDay[] => {
    const today = todayDate || new Date().toISOString().split('T')[0];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const firstDayOfWeek = firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();

    const days: CalendarDay[] = [];

    // Debug: Log holiday dates for this month
    const holidayDatesForMonth = holidays.filter((h) => {
      const hYear = parseInt(h.date.split('-')[0]);
      const hMonth = parseInt(h.date.split('-')[1]);
      return hYear === year && hMonth === month + 1;
    });
    if (holidayDatesForMonth.length > 0) {
      console.log(
        `Holidays in ${month + 1}/${year}:`,
        holidayDatesForMonth.map((h) => h.date)
      );
    }

    // Previous month's days
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(prevLastDate - i).padStart(2, '0')}`;
      const isHoliday = holidays.some((h) => h.date === dateStr);
      days.push({
        date: dateStr,
        day: prevLastDate - i,
        isCurrentMonth: false,
        isHoliday,
        isToday: dateStr === today,
      });
    }

    // Current month's days
    for (let date = 1; date <= lastDateOfMonth; date++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const record = checkInOutRecords.find((r) => r.date === dateStr);
      const isHoliday = holidays.some((h) => h.date === dateStr);

      days.push({
        date: dateStr,
        day: date,
        isCurrentMonth: true,
        record,
        isHoliday,
        isToday: dateStr === today,
      });
    }

    // Next month's days
    const nextYear = month === 11 ? year + 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    const totalCells = 42; // 6 weeks * 7 days
    const remainingCells = totalCells - days.length;
    for (let date = 1; date <= remainingCells; date++) {
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const isHoliday = holidays.some((h) => h.date === dateStr);
      days.push({
        date: dateStr,
        day: date,
        isCurrentMonth: false,
        isHoliday,
        isToday: dateStr === today,
      });
    }

    return days;
  };

  const days = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handlePrevMonth = async () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
    await fetchMonthAttendance(prevMonth);
  };

  const handleNextMonth = async () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
    await fetchMonthAttendance(nextMonth);
  };

  const fetchMonthAttendance = async (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();

    try {
      const response = await getAttendancesByMonth({
        employeeId,
        year,
        month,
        limit: lastDay,
      }).unwrap();

      if (response?.data?.items && onMonthChange) {
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

        const records: CheckInOutRecord[] = response.data.items.map((item: any) => {
          const checkInDate = new Date(item.checkInAt);
          const dateStr = checkInDate.toISOString().split('T')[0];
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

          return { date: dateStr, checkInTime, checkOutTime, status, attendanceStatus };
        });

        onMonthChange(records);
      }
    } catch (error) {
      console.error('Failed to fetch attendance for month:', error);
    }
  };

  const renderDayCell = ({ item }: { item: CalendarDay }) => {
    const statusColor = getStatusColor(item.record?.attendanceStatus, item.isHoliday);
    const statusLabel = getStatusLabel(item.record, item.isHoliday);

    return (
      <View style={[styles.dayCell, item.isToday && styles.todayCell]}>
        <Text
          style={[
            styles.dayNumber,
            !item.isCurrentMonth && styles.otherMonthDay,
            item.isToday && styles.todayText,
          ]}
        >
          {item.day}
        </Text>
        {(statusLabel || item.isHoliday) && (
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusLabel}>{statusLabel || 'Holiday'}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderWeekDayHeader = () => {
    return (
      <View style={styles.weekDayRow}>
        {weekDays.map((day) => (
          <View key={day} style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationRow}>
        <Text onPress={handlePrevMonth} style={styles.navButton}>
          ← Prev
        </Text>
        <Text style={styles.monthTitle}>{monthName}</Text>
        <Text onPress={handleNextMonth} style={styles.navButton}>
          Next →
        </Text>
      </View>

      {renderWeekDayHeader()}

      <FlatList
        data={days}
        renderItem={renderDayCell}
        keyExtractor={(item) => item.date}
        numColumns={7}
        scrollEnabled={false}
        columnWrapperStyle={styles.weekRow}
      />

      <View style={styles.legendContainer}>
        <View style={styles.legendRow}>
          <View style={[styles.legendBox, { backgroundColor: '#51CF66' }]} />
          <Text style={styles.legendText}>Present</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendBox, { backgroundColor: '#FF8C8C' }]} />
          <Text style={styles.legendText}>Absent</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendBox, { backgroundColor: '#FFD93D' }]} />
          <Text style={styles.legendText}>Weekly Off</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendBox, { backgroundColor: '#FF6B6B' }]} />
          <Text style={styles.legendText}>Holiday</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendBox, { backgroundColor: '#6C5CE7' }]} />
          <Text style={styles.legendText}>Leave</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendBox, { backgroundColor: '#74B9FF' }]} />
          <Text style={styles.legendText}>Half Day</Text>
        </View>
      </View>
    </View>
  );
};
