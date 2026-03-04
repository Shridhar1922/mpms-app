import React, { useEffect, useRef, useCallback } from 'react';
import { Animated, Text } from 'react-native';
import { styles } from './CustomToast.styles';
import AppIcon from '../../AppIcon/AppIcon';
import { ERROR_ICON, INFO_ICON, SUCCESS_ICON } from '../../../assets/svgIcons/SvgIcon';

type ToastType = 'success' | 'error' | 'info';

interface Props {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide: () => void;
}

export const CustomToast: React.FC<Props> = ({
  visible,
  message,
  type = 'info',
  duration = 2500,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-80)).current;

  // ✅ Stable callback
  const hideToast = useCallback(() => {
    Animated.timing(translateY, {
      toValue: -80,
      duration: 300,
      useNativeDriver: true,
    }).start(onHide);
  }, [onHide, translateY]);

  // ✅ Correct dependencies
  useEffect(() => {
    if (!visible) return;

    Animated.timing(translateY, {
      toValue: 40,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(hideToast, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, hideToast, translateY]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, styles[type], { transform: [{ translateY }] }]}>
      <AppIcon
        name={type === 'success' ? SUCCESS_ICON : type === 'error' ? ERROR_ICON : INFO_ICON}
        size={18}
      />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};
