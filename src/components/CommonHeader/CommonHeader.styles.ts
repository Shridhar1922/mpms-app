import { Platform, StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../styles/responsiveStyles';
import { Colors } from '../../styles/colors';
import { FontFamily, FontSize } from '../../styles/typography';

export const styles = StyleSheet.create({
  header: {
    height: scale(Platform.OS === 'ios' ? 100 : 80),
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: moderateScale(Platform.OS === 'ios' ? 50 : 30),
    paddingHorizontal: moderateScale(20),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuBtn: {
    width: scale(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  menuText: {
    fontSize: Platform.OS === 'ios' ? FontSize.M_18 : FontSize.S_12,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.white,
  },
  modalImg: {
    width: scale(20),
    height: verticalScale(20),
    marginBottom: moderateScale(10),
    alignItems: 'center',
    tintColor: Colors.white,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSize.S_12,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.white,
  },
  w40: {
    width: scale(40),
  },
});
