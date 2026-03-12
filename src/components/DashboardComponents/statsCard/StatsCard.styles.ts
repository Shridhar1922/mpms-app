import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, textScale } from '../../../styles/responsiveStyles';
import { Colors } from '../../../styles/colors';
import { FontFamily } from '../../../styles/typography';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.grey[100],
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '48%',
    marginBottom: verticalScale(20),
  },
  value: {
    fontSize: textScale(15),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.darkgray,
  },
  title: {
    fontSize: textScale(8),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.dimgray,
  },
});
