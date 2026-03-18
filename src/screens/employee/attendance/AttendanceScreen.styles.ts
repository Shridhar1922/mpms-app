import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { moderateScale, scale, textScale } from '../../../styles/responsiveStyles';
import { FontFamily } from '../../../styles/typography';

export const styles = StyleSheet.create({
  statsContainer: {
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
  statsTitle: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.black,
    marginBottom: moderateScale(16),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statCircle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  presentCircle: {
    backgroundColor: Colors.success,
  },
  absentCircle: {
    backgroundColor: Colors.error,
  },
  statValue: {
    fontSize: textScale(20),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.white,
  },
  statLabel: {
    fontSize: textScale(8),
    color: Colors.black,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
  },
});
