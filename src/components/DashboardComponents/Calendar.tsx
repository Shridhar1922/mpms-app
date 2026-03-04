import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../styles/colors';
import { verticalScale, horizontalScale, moderateScale } from '../../styles/responsiveStyles';
import { CheckInOutRecord } from '../../redux/slices/dashboardSlice';

interface CalendarProps {
  checkInOutRecords: CheckInOutRecord[];
  onDateSelect?: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ checkInOutRecords, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dateStr = date.toISOString().split('T')[0];
    days.push({ day: i, dateStr });
  }

  const getRecordForDate = (dateStr: string) => {
    return checkInOutRecords.find((record) => record.date === dateStr);
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.monthTitle}>{monthName}</Text>

        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Day headers */}
      <View style={styles.weekDaysContainer}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <View key={day} style={styles.weekDayHeader}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Days grid */}
      <View style={styles.daysGrid}>
        {days.map((dayObj, index) => {
          if (!dayObj) {
            return <View key={`empty-${index}`} style={styles.emptyCell} />;
          }

          const { day, dateStr } = dayObj;
          const record = getRecordForDate(dateStr);
          const todayFlag = isToday(dateStr);
          let dayBackgroundColor = Colors.white;
          let dayTextColor = Colors.darkgray;
          let borderColor = Colors.gainsboro;
          let showBorder = false;

          if (record) {
            if (record.status === 'checked-out') {
              dayBackgroundColor = Colors.success;
              dayTextColor = Colors.white;
            } else if (record.status === 'checked-in') {
              dayBackgroundColor = Colors.primary;
              dayTextColor = Colors.white;
            } else if (record.status === 'absent') {
              dayBackgroundColor = Colors.error;
              dayTextColor = Colors.white;
            }
          }

          if (todayFlag && !record) {
            borderColor = Colors.primary;
            showBorder = true;
          }

          return (
            <TouchableOpacity
              key={dateStr}
              style={[
                styles.dayCell,
                {
                  backgroundColor: dayBackgroundColor,
                  borderColor: borderColor,
                  borderWidth: showBorder ? 2 : 1,
                },
              ]}
              onPress={() => onDateSelect?.(dateStr)}
            >
              <Text style={[styles.dayText, { color: dayTextColor }]}>{day}</Text>
              {record && (
                <View style={styles.recordIndicator}>
                  {record.checkInTime && record.checkOutTime && (
                    <Text style={styles.indicatorText}>✓✓</Text>
                  )}
                  {record.checkInTime && !record.checkOutTime && (
                    <Text style={styles.indicatorText}>✓</Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.primary }]} />
          <Text style={styles.legendText}>Checked In</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.success }]} />
          <Text style={styles.legendText}>Checked Out</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: Colors.error }]} />
          <Text style={styles.legendText}>Absent</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginHorizontal: horizontalScale(16),
    marginVertical: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  navButton: {
    padding: moderateScale(8),
  },
  navButtonText: {
    fontSize: moderateScale(24),
    color: Colors.primary,
    fontWeight: 'bold',
  },
  monthTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.darkgray,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(8),
  },
  weekDayHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },
  weekDayText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: Colors.grey[500],
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 7 days per week
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.gainsboro,
    marginBottom: verticalScale(4),
  },
  emptyCell: {
    width: '14.28%',
    aspectRatio: 1,
  },
  dayText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    textAlign: 'center',
  },
  recordIndicator: {
    position: 'absolute',
    bottom: moderateScale(2),
    right: moderateScale(2),
  },
  indicatorText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: Colors.white,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(12),
    paddingTop: verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: Colors.gainsboro,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(4),
  },
  legendColor: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(2),
    marginRight: horizontalScale(6),
  },
  legendText: {
    fontSize: moderateScale(12),
    color: Colors.darkgray,
  },
});
