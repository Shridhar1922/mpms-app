import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './CheckInOutCard.styles';

interface CheckInOutCardProps {
  userName: string;
  currentDateStr: string;
  shiftName?: string;
  shiftTime?: string;
  currentDayCheckedIn: boolean;
  currentDayCheckedOut: boolean;
  currentCheckInTime?: string;
  currentCheckOutTime?: string;
  onCheckIn: () => void;
  onCheckOut: () => void;
  isCheckInLoading?: boolean;
  isCheckOutLoading?: boolean;
}

// helper to compute duration between two HH:mm:ss strings
const getDuration = (start: string, end: string) => {
  const [sh, sm, ss = '0'] = start.split(':').map(Number);
  const [eh, em, es = '0'] = end.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(sh, sm, ss, 0);
  const endDate = new Date();
  endDate.setHours(eh, em, es, 0);
  let diff = (endDate.getTime() - startDate.getTime()) / 1000;
  if (diff < 0) diff += 24 * 3600; // wrap around midnight
  const h = Math.floor(diff / 3600);
  diff %= 3600;
  const m = Math.floor(diff / 60);
  const s = Math.floor(diff % 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

export const CheckInOutCard: React.FC<CheckInOutCardProps> = ({
  userName,
  currentDateStr,
  shiftName,
  shiftTime,
  currentDayCheckedIn,
  currentDayCheckedOut,
  currentCheckInTime,
  currentCheckOutTime,
  onCheckIn,
  onCheckOut,
  isCheckInLoading = false,
  isCheckOutLoading = false,
}) => {
  // const getCurrentTime = () => {
  //   const now = new Date();
  //   const hours = String(now.getHours()).padStart(2, '0');
  //   const minutes = String(now.getMinutes()).padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // };

  const [elapsed, setElapsed] = React.useState('00:00:00');
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (currentDayCheckedIn && !currentDayCheckedOut && currentCheckInTime) {
      // Initialize elapsed seconds from the actual check-in time
      const initializeElapsed = () => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        const duration = getDuration(currentCheckInTime, currentTime);
        const [h, m, s] = duration.split(':').map(Number);
        const totalSeconds = h * 3600 + m * 60 + s;
        setElapsedSeconds(totalSeconds);
        setElapsed(duration);
      };

      initializeElapsed();

      const updateElapsed = () => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        const duration = getDuration(currentCheckInTime, currentTime);
        setElapsed(duration);
      };

      interval = setInterval(updateElapsed, 1000);
    } else if (!currentDayCheckedIn) {
      // Only reset when not checked in (don't reset when just checked out)
      setElapsedSeconds(0);
      setElapsed('00:00:00');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentDayCheckedIn, currentDayCheckedOut, currentCheckInTime]);

  const [hh, mm, ss] = elapsed.split(':');

  return (
    <View style={styles.card}>
      {/* user header */}
      <View style={styles.userHeader}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userDate}>{currentDateStr}</Text>
      </View>

      {/* elapsed counters */}
      <View style={styles.countersRow}>
        <View style={styles.counterBox}>
          <Text style={styles.counterText}>{hh}</Text>
        </View>
        <View style={styles.counterBox}>
          <Text style={styles.counterText}>{mm}</Text>
        </View>
        <View style={styles.counterBox}>
          <Text style={styles.counterText}>{ss}</Text>
        </View>
      </View>

      {/* separator line */}
      <View style={styles.separatorLine} />

      {/* shift info */}
      {(shiftName || shiftTime) && (
        <View style={styles.shiftContainer}>
          {shiftName && <Text style={styles.shiftName}>{shiftName}</Text>}
          {shiftTime && <Text style={styles.shiftTime}>{shiftTime}</Text>}
        </View>
      )}

      <View style={styles.statusContainer}>
        {/* Check In Section */}
        <View style={styles.statusSection}>
          {currentDayCheckedIn ? (
            <View style={styles.alignItemCenter}>
              <Text style={styles.timeText}>{currentCheckInTime || '--:--'}</Text>
              <Text style={styles.statusText}>Checked In</Text>
              {/* show live duration when checked in and not checked out */}
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                styles.checkInButton,
                isCheckInLoading && styles.buttonDisabled,
              ]}
              onPress={onCheckIn}
              disabled={isCheckInLoading}
            >
              {isCheckInLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Check In</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Check Out Section */}
        <View style={styles.statusSection}>
          {currentDayCheckedOut ? (
            <View style={styles.alignItemCenter}>
              <Text style={styles.timeText}>{currentCheckOutTime || '--:--'}</Text>
              <Text style={styles.statusText}>Checked Out</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                styles.checkOutButton,
                (!currentDayCheckedIn || isCheckOutLoading) && styles.buttonDisabled,
              ]}
              onPress={onCheckOut}
              disabled={!currentDayCheckedIn || isCheckOutLoading}
            >
              {isCheckOutLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text
                  style={[styles.buttonText, !currentDayCheckedIn && styles.buttonTextDisabled]}
                >
                  Check Out
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* worked duration summary */}
      {currentCheckInTime && currentCheckOutTime && (
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>
            You worked for: {getDuration(currentCheckInTime, currentCheckOutTime)}
          </Text>
        </View>
      )}
    </View>
  );
};
