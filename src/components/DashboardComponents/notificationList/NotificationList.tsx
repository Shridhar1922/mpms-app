import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './NotificationList.styles.ts';

export interface NotificationItemType {
  id: string;
  title: string;
  message: string;
  date: string;
}

interface NotificationListProps {
  notifications: NotificationItemType[];
}

const NotificationRow: React.FC<{ item: NotificationItemType }> = ({ item }) => {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationText} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
      <Text style={styles.notificationDate}>{item.date}</Text>
    </View>
  );
};

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>Notifications</Text>
      </View>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notifications</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          scrollEnabled={false}
          renderItem={({ item }) => <NotificationRow item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};
