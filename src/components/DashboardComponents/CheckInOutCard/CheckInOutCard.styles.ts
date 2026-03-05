import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
  textScale,
  scale,
} from '../../../styles/responsiveStyles';
import { FontFamily } from '../../../styles/typography';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginHorizontal: horizontalScale(16),
    marginVertical: verticalScale(12),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: textScale(12),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
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

  timeText: {
    fontSize: textScale(15),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.primary,
    marginBottom: verticalScale(4),
  },
  statusText: {
    fontSize: textScale(8),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_MEDIUM,
    color: Colors.success,
  },
  button: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(12),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scale(40),
  },
  checkInButton: {
    backgroundColor: Colors.primary,
  },
  checkOutButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
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
  durationContainer: {
    marginTop: verticalScale(12),
    alignItems: 'center',
  },
  durationText: {
    fontSize: textScale(8),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.darkgray,
  },
  userHeader: {
    marginBottom: verticalScale(10),
    alignItems: 'center',
  },
  userName: {
    fontSize: textScale(12),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.darkgray,
  },
  userDate: {
    fontSize: textScale(8),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_MEDIUM,
    color: Colors.grey[500],
  },
  countersRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: verticalScale(12),
  },
  counterBox: {
    backgroundColor: Colors.grey[100],
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    minWidth: horizontalScale(40),
    alignItems: 'center',
  },
  counterText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: Colors.darkgray,
  },
  shiftContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  shiftName: {
    fontSize: moderateScale(14),
    color: Colors.darkgray,
    fontWeight: '500',
  },
  shiftTime: {
    fontSize: moderateScale(12),
    color: Colors.grey[500],
  },
  separatorLine: {
    height: verticalScale(1),
    backgroundColor: Colors.gainsboro,
    marginVertical: verticalScale(12),
  },
});
