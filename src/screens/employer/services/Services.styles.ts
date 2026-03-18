import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { moderateScale, textScale } from '../../../styles/responsiveStyles';
import { FontFamily } from '../../../styles/typography';

export const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  serviceButtonContainer: {
    width: '45%',
    paddingHorizontal: moderateScale(10),
  },
  serviceButton: {
    borderWidth: 1,
    borderColor: Colors.offwhite,
    backgroundColor: Colors.grey[100],
    marginVertical: moderateScale(20),
    paddingVertical: moderateScale(20),
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },

  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },

  title: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(10),
    textAlign: 'center',
  },
  pB30: {
    paddingBottom: moderateScale(30),
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    marginTop: moderateScale(20),
    borderRadius: moderateScale(12),
    elevation: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
