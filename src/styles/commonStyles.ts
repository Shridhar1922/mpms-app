import { StyleSheet, ViewStyle } from 'react-native';
import { verticalScale, moderateScale, horizontalScale } from './responsiveStyles';
import { Colors } from './colors';

/**
 * Common Layout & Flex Styles
 */
export const CommonStyles = StyleSheet.create({
  // Flex Helpers
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: { alignItems: 'center' },
  justifyCenter: { justifyContent: 'center' },
  selfCenter: { alignSelf: 'center' },

  // Positioning
  absolute: { position: 'absolute' },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Common Containers (Using your responsive logic)
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16), // Scales with width
    backgroundColor: Colors.white,
  },

  // Shadow helper (iOS/Android)
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 4, // Android
  },

  // Divider
  separator: {
    height: verticalScale(1),
    width: '100%',
    backgroundColor: Colors.grey[100],
    marginVertical: verticalScale(10),
  },
});

/**
 * Dynamic Spacing Factories
 * These are useful for quick inline margins/paddings
 */
export const Spacing = {
  mH: (val: number): ViewStyle => ({ marginHorizontal: horizontalScale(val) }),
  mV: (val: number): ViewStyle => ({ marginVertical: verticalScale(val) }),
  pH: (val: number): ViewStyle => ({ paddingHorizontal: horizontalScale(val) }),
  pV: (val: number): ViewStyle => ({ paddingVertical: verticalScale(val) }),
  p: (val: number): ViewStyle => ({ padding: moderateScale(val) }),
  m: (val: number): ViewStyle => ({ margin: moderateScale(val) }),
};
