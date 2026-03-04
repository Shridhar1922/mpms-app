import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../styles/responsiveStyles';
import { FontFamily, FontSize } from '../../styles/typography';

export const styles = StyleSheet.create({
  logo: {
    width: scale(100),
    height: verticalScale(100),
  },
  title: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    fontSize: FontSize.REG_16,
  },
  subtitle: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: FontSize.XS_8,
  },

  form: {
    marginVertical: verticalScale(20),
    width: '100%',
  },

  inputGroup: {
    marginBottom: verticalScale(10),
  },
});
