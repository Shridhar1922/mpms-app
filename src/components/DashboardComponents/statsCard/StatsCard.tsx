import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './StatsCard.styles';

interface StatsCardProps {
  title: string;
  value: number | string;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, color }) => (
  <View style={[styles.card, color ? { borderColor: color } : null]}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
