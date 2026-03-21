import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../styles/responsiveStyles';
import { FontFamily, FontSize } from '../../styles/typography';
import { Colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
    width: '100%',
  },
  label: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_LIGHT,
    fontSize: FontSize.S_10,
    marginBottom: moderateScale(5),
    color: Colors.darkgray,
  },
  input: {
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: 8,
    paddingHorizontal: moderateScale(15),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: FontSize.S_12,
    backgroundColor: Colors.white,
    color: Colors.black,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: FontSize.XS_8,
    marginTop: moderateScale(5),
  },
});
