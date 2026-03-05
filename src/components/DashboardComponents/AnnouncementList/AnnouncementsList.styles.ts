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
    gap: verticalScale(8),
  },
  announcementItem: {
    flexDirection: 'row',
    backgroundColor: Colors.grey[100],
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    alignItems: 'flex-start',
  },
  priorityIndicator: {
    width: horizontalScale(4),
    height: verticalScale(60),
    borderRadius: moderateScale(2),
    marginRight: horizontalScale(12),
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.darkgray,
    marginBottom: verticalScale(4),
  },
  announcementText: {
    fontSize: textScale(8),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.dimgray,
    marginBottom: verticalScale(6),
    lineHeight: moderateScale(18),
  },
  announcementDate: {
    fontSize: textScale(8),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_MEDIUM,
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
