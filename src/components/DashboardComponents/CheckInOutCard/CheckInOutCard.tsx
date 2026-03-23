import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
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
const getDuration = (start: string, end: string): string => {
  const parseParts = (timeStr: string) => {
    const parts = timeStr.split(':').map(Number);
    return {
      h: parts[0] || 0,
      m: parts[1] || 0,
      s: parts[2] || 0,
    };
  };

  const startParts = parseParts(start);
  const endParts = parseParts(end);

  const startDate = new Date();
  startDate.setHours(startParts.h, startParts.m, startParts.s, 0);

  const endDate = new Date();
  endDate.setHours(endParts.h, endParts.m, endParts.s, 0);

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
  const checkInTimeRef = React.useRef<string | undefined>(currentCheckInTime);
  const fillProgress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    checkInTimeRef.current = currentCheckInTime;
  }, [currentCheckInTime]);

  // Start 9-hour fill animation when checked in
  React.useEffect(() => {
    if (currentDayCheckedIn && !currentDayCheckedOut) {
      fillProgress.setValue(0);
      Animated.timing(fillProgress, {
        toValue: 1,
        duration: 9 * 60 * 60 * 1000, // 9 hours in milliseconds
        useNativeDriver: false,
      }).start();
    } else {
      fillProgress.setValue(0);
    }
  }, [currentDayCheckedIn, currentDayCheckedOut]);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    // If checked out, show the total duration worked
    if (currentDayCheckedOut && currentCheckInTime && currentCheckOutTime) {
      const duration = getDuration(currentCheckInTime, currentCheckOutTime);
      setElapsed(duration);
      const [h, m, s] = duration.split(':').map(Number);
      const totalSeconds = h * 3600 + m * 60 + s;
      setElapsedSeconds(totalSeconds);
    } else if (currentDayCheckedIn && !currentDayCheckedOut) {
      // Initialize elapsed seconds from the actual check-in time
      const initializeElapsed = () => {
        const checkInTime = checkInTimeRef.current;
        if (!checkInTime) return;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        const duration = getDuration(checkInTime, currentTime);
        const [h, m, s] = duration.split(':').map(Number);
        const totalSeconds = h * 3600 + m * 60 + s;
        setElapsedSeconds(totalSeconds);
        setElapsed(duration);
      };

      initializeElapsed();

      const updateElapsed = () => {
        const checkInTime = checkInTimeRef.current;
        if (!checkInTime) return;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        const duration = getDuration(checkInTime, currentTime);
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
  }, [currentDayCheckedIn, currentDayCheckedOut, currentCheckInTime, currentCheckOutTime]);

  const [hh, mm, ss] = elapsed.split(':') as [string, string, string];

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

      {/* separator line with 9-hour fill animation */}
      <View style={styles.separatorLineContainer}>
        <View style={styles.separatorLine} />
        <Animated.View
          style={[
            styles.separatorLineFill,
            {
              width: fillProgress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

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
