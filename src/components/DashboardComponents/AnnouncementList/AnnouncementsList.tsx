import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Colors } from '../../../styles/colors';
import { Announcement } from '../../../redux/slices/dashboardSlice';
import { styles } from './AnnouncementsList.styles';

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
  // loading = false,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>Announcements</Text>
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
