import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../../styles/colors';
import { verticalScale, horizontalScale, moderateScale } from '../../styles/responsiveStyles';
import { Holiday } from '../../redux/slices/dashboardSlice';

interface HolidaysListProps {
  holidays: Holiday[];
  loading?: boolean;
}

const HolidayItem: React.FC<{ item: Holiday }> = ({ item }) => {
  // Parse date and format it
  const dateObj = new Date(item.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.holidayItem}>
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{dateObj.getDate()}</Text>
        <Text style={styles.monthText}>
          {dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
        </Text>
      </View>
      <View style={styles.holidayContent}>
        <Text style={styles.holidayName}>{item.name}</Text>
        <Text style={styles.holidayDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export const HolidaysList: React.FC<HolidaysListProps> = ({ holidays, loading = false }) => {
  // Sort holidays by date
  const sortedHolidays = [...holidays].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  // Filter upcoming holidays (today and forward)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingHolidays = sortedHolidays.filter((holiday) => {
    return new Date(holiday.date) >= today;
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>Upcoming Holidays</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{upcomingHolidays.length}</Text>
        </View>
      </View>

      {upcomingHolidays.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No upcoming holidays</Text>
        </View>
      ) : (
        <FlatList
          data={upcomingHolidays}
          scrollEnabled={false}
          renderItem={({ item }) => <HolidayItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    marginBottom: verticalScale(12),
  },
  cardTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: Colors.darkgray,
  },
  badge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
  },
  badgeText: {
    color: Colors.white,
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  listContent: {
    gap: verticalScale(12),
  },
  holidayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.grey[100],
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
  },
  dateBox: {
    backgroundColor: Colors.accent,
    borderRadius: moderateScale(8),
    padding: moderateScale(8),
    alignItems: 'center',
    marginRight: horizontalScale(12),
    minWidth: horizontalScale(60),
  },
  dateText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: Colors.white,
  },
  monthText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: Colors.white,
    marginTop: verticalScale(2),
  },
  holidayContent: {
    flex: 1,
    justifyContent: 'center',
  },
  holidayName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Colors.darkgray,
    marginBottom: verticalScale(4),
  },
  holidayDescription: {
    fontSize: moderateScale(12),
    color: Colors.dimgray,
    lineHeight: moderateScale(18),
  },
  emptyContainer: {
    paddingVertical: verticalScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: moderateScale(14),
    color: Colors.grey[500],
    textAlign: 'center',
  },
});
