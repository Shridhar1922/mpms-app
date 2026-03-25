import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { moderateScale, textScale } from '../../../styles/responsiveStyles';
import { FontFamily } from '../../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: moderateScale(20),
    borderRadius: moderateScale(12),
    elevation: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: moderateScale(15),
  },
  searchContainer: {
    marginBottom: moderateScale(15),
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(10),
    color: Colors.black,
  },
  employeeCount: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: textScale(10),
    color: Colors.primary,
    marginBottom: moderateScale(10),
  },
  listContent: {
    paddingBottom: moderateScale(20),
  },
  employeeCard: {
    borderColor: '#D9E5FF',
    borderWidth: 1,
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    marginBottom: moderateScale(12),
  },
  cardHeaderButton: {
    paddingBottom: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.offwhite,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expandIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  expandedContent: {
    paddingTop: moderateScale(12),
  },
  employeeName: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: textScale(11),
    color: Colors.black,
  },
  employeeInfo: {
    flex: 1,
  },
  statusBadgeContainer: {
    marginTop: moderateScale(6),
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    marginBottom: moderateScale(12),
  },
  detailLabel: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: textScale(9),
    color: Colors.black,
    marginBottom: moderateScale(2),
  },
  detailValue: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(8),
    color: Colors.black,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(6),
  },
  activeStatus: {
    backgroundColor: Colors.success,
  },
  inactiveStatus: {
    backgroundColor: Colors.error,
  },
  statusText: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: textScale(7),
    color: Colors.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: moderateScale(40),
  },
  emptyStateText: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: textScale(16),
    color: Colors.dimgray,
    marginBottom: moderateScale(8),
  },
  emptyStateSubtext: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(12),
    color: Colors.grey[500],
  },
  errorContainer: {
    backgroundColor: '#FFE6E6',
    borderColor: Colors.error,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginBottom: moderateScale(12),
  },
  errorText: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(10),
    color: Colors.error,
  },
});
