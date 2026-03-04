import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Colors } from '../../styles/colors';
import { verticalScale, horizontalScale, moderateScale } from '../../styles/responsiveStyles';
import { Announcement } from '../../redux/slices/dashboardSlice';

interface AnnouncementsListProps {
  announcements: Announcement[];
  loading?: boolean;
}

const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high':
      return Colors.error;
    case 'medium':
      return Colors.warning;
    case 'low':
      return Colors.info;
    default:
      return Colors.grey[500];
  }
};

const AnnouncementItem: React.FC<{ item: Announcement }> = ({ item }) => {
  const priorityColor = getPriorityColor(item.priority);

  return (
    <View style={styles.announcementItem}>
      <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
      <View style={styles.announcementContent}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementText} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
      </View>
    </View>
  );
};

export const AnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
  loading = false,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>Announcements</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{announcements.length}</Text>
        </View>
      </View>

      {announcements.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No announcements at the moment</Text>
        </View>
      ) : (
        <FlatList
          data={announcements}
          scrollEnabled={false}
          renderItem={({ item }) => <AnnouncementItem item={item} />}
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
    backgroundColor: Colors.primary,
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
    gap: verticalScale(8),
  },
  announcementItem: {
    flexDirection: 'row',
    backgroundColor: Colors.grey[100],
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    alignItems: 'flex-start',
  },
  priorityIndicator: {
    width: horizontalScale(4),
    height: verticalScale(60),
    borderRadius: moderateScale(2),
    marginRight: horizontalScale(12),
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Colors.darkgray,
    marginBottom: verticalScale(4),
  },
  announcementText: {
    fontSize: moderateScale(12),
    color: Colors.dimgray,
    marginBottom: verticalScale(6),
    lineHeight: moderateScale(18),
  },
  announcementDate: {
    fontSize: moderateScale(11),
    color: Colors.grey[500],
    fontWeight: '500',
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
