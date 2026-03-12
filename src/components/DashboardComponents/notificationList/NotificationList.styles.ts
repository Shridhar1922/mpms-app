import { StyleSheet } from 'react-native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
  textScale,
} from '../../../styles/responsiveStyles';
import { Colors } from '../../../styles/colors';
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  cardTitle: {
    fontSize: textScale(12),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.darkgray,
  },
  listContent: {
    gap: verticalScale(12),
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Colors.grey[100],
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
  },
  notificationContent: {
    flex: 1,
    marginRight: horizontalScale(8),
  },
  notificationTitle: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.darkgray,
  },
  notificationText: {
    fontSize: textScale(7),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.dimgray,
  },
  notificationDate: {
    fontSize: textScale(7),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.grey[500],
  },
  emptyContainer: {
    paddingVertical: verticalScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: textScale(8),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.grey[500],
    textAlign: 'center',
  },
});
