import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Holiday } from '../../../redux/slices/dashboardSlice';
import { styles } from './HolidaysList.styles';

interface HolidaysListProps {
  holidays: Holiday[];
  loading?: boolean;
  type?: 'all' | 'upcoming';
}

const HolidayItem: React.FC<{ item: Holiday }> = ({ item }) => {
  // Parse date and format it
  const dateObj = new Date(item.date);
  // const formattedDate = dateObj.toLocaleDateString('en-US', {
  //   weekday: 'short',
  //   month: 'short',
  //   day: 'numeric',
  // });

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

export const HolidaysList: React.FC<HolidaysListProps> = ({ holidays, type = 'all' }) => {
  // Sort holidays by date
  const sortedHolidays = [...holidays].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  // Filter upcoming holidays if type is 'upcoming'
  const filteredHolidays =
    type === 'upcoming'
      ? sortedHolidays.filter((holiday) => new Date(holiday.date) >= new Date())
      : sortedHolidays;

  const title = type === 'upcoming' ? 'Upcoming Holidays' : 'All Holidays';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>

      {filteredHolidays.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No holidays available</Text>
        </View>
      ) : (
        <FlatList
          data={filteredHolidays}
          scrollEnabled={false}
          renderItem={({ item }) => <HolidayItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};
