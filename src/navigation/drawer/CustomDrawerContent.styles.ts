import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import { FontFamily, FontSize } from '../../styles/typography';
import { moderateScale } from '../../styles/responsiveStyles';

export const styles = StyleSheet.create({
  profileSection: {
    padding: moderateScale(20),
    backgroundColor: Colors.primary,
  },
  userName: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    fontSize: FontSize.S_12,
    color: Colors.white,
  },
  userEmail: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: FontSize.XS_8,
    color: Colors.offwhite,
  },
  drawerItem: {
    padding: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.gainsboro,
  },
  drawerText: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: FontSize.S_10,
    color: Colors.darkgray,
  },
  colorRed: {
    color: Colors.error,
  },
});
