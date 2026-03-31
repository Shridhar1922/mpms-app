import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../styles/responsiveStyles';
import { FontFamily, FontSize } from '../../styles/typography';
import { Colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(10),
  },
  primaryButton: {
    backgroundColor: Colors.blue,
  },
  outlineButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  text: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: FontSize.S_10,
  },
  primaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.blue,
  },
});
