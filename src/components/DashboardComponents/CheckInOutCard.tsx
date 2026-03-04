import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import { verticalScale, horizontalScale, moderateScale } from '../../styles/responsiveStyles';

interface CheckInOutCardProps {
  currentDayCheckedIn: boolean;
  currentDayCheckedOut: boolean;
  currentCheckInTime?: string;
  currentCheckOutTime?: string;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export const CheckInOutCard: React.FC<CheckInOutCardProps> = ({
  currentDayCheckedIn,
  currentDayCheckedOut,
  currentCheckInTime,
  currentCheckOutTime,
  onCheckIn,
  onCheckOut,
}) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Attendance</Text>

      <View style={styles.statusContainer}>
        {/* Check In Section */}
        <View style={styles.statusSection}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusLabel}>Check In</Text>
            {currentDayCheckedIn && (
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>✓</Text>
              </View>
            )}
          </View>
          {currentDayCheckedIn ? (
            <View>
              <Text style={styles.timeText}>{currentCheckInTime || '--:--'}</Text>
              <Text style={styles.statusText}>Checked In</Text>
            </View>
          ) : (
            <TouchableOpacity style={[styles.button, styles.checkInButton]} onPress={onCheckIn}>
              <Text style={styles.buttonText}>Check In</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Check Out Section */}
        <View style={styles.statusSection}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusLabel}>Check Out</Text>
            {currentDayCheckedOut && (
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>✓</Text>
              </View>
            )}
          </View>
          {currentDayCheckedOut ? (
            <View>
              <Text style={styles.timeText}>{currentCheckOutTime || '--:--'}</Text>
              <Text style={styles.statusText}>Checked Out</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                styles.checkOutButton,
                !currentDayCheckedIn && styles.buttonDisabled,
              ]}
              onPress={onCheckOut}
              disabled={!currentDayCheckedIn}
            >
              <Text style={[styles.buttonText, !currentDayCheckedIn && styles.buttonTextDisabled]}>
                Check Out
              </Text>
            </TouchableOpacity>
          )}
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
  cardTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: Colors.darkgray,
    marginBottom: verticalScale(12),
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  statusSection: {
    flex: 1,
    justifyContent: 'center',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  statusLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: Colors.darkgray,
  },
  statusBadge: {
    backgroundColor: Colors.success,
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadgeText: {
    color: Colors.white,
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  timeText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: verticalScale(4),
  },
  statusText: {
    fontSize: moderateScale(12),
    color: Colors.success,
    fontWeight: '500',
  },
  button: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(12),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: verticalScale(40),
  },
  checkInButton: {
    backgroundColor: Colors.primary,
  },
  checkOutButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: Colors.lightgray,
  },
  buttonDisabled: {
    backgroundColor: Colors.gainsboro,
  },
  divider: {
    width: horizontalScale(1),
    backgroundColor: Colors.gainsboro,
    marginHorizontal: horizontalScale(12),
  },
});
