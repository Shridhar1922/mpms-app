import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { moderateScale, scale, textScale } from '../../../styles/responsiveStyles';
import { FontFamily } from '../../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(12),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: moderateScale(16),
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: textScale(14),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.primary,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  navButton: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.primary,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
  },
  currentMonthText: {
    fontSize: textScale(12),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_MEDIUM,
    color: Colors.darkgray,
  },
  weekDayRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(8),
  },
  weekDayCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
  },
  weekDayText: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.grey[500],
  },
  weekRow: {
    justifyContent: 'space-between',
    marginBottom: moderateScale(4),
  },
  dayCell: {
    width: '13%', // 100 / 7
    aspectRatio: 0.9,
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    backgroundColor: Colors.grey[100],
    paddingTop: moderateScale(4),
    marginBottom: moderateScale(6),
    marginHorizontal: moderateScale(1),
  },
  todayCell: {
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  dayNumber: {
    fontSize: textScale(9),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.darkgray,
    marginBottom: moderateScale(2),
  },
  todayText: {
    color: Colors.white,
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
  },
  otherMonthDay: {
    color: Colors.grey[500],
  },
  statusBadge: {
    paddingHorizontal: moderateScale(4),
    paddingVertical: moderateScale(2),
    borderRadius: 4,
    marginTop: moderateScale(2),
  },
  statusLabel: {
    fontSize: textScale(5),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.white,
    textAlign: 'center',
  },
  legendContainer: {
    marginTop: moderateScale(16),
    paddingTop: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  legendBox: {
    width: scale(14),
    height: scale(14),
    borderRadius: 3,
    marginRight: moderateScale(8),
  },
  legendText: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.darkgray,
  },
});
