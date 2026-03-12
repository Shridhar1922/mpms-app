import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { moderateScale, scale, textScale } from '../../../styles/responsiveStyles';
import { FontFamily } from '../../../styles/typography';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  header: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: moderateScale(40),
  },

  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: 100,
    marginBottom: moderateScale(10),
    marginTop: moderateScale(40),
  },

  name: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    fontSize: textScale(12),
    color: Colors.white,
  },

  role: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(8),
    color: Colors.white,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(-40),
    paddingHorizontal: moderateScale(10),
  },

  statBox: {
    borderWidth: 2,
    borderColor: Colors.offwhite,
    backgroundColor: Colors.white,
    width: '28%',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 3,
    gap: moderateScale(5),
  },

  statNumber: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    fontSize: textScale(12),
    color: Colors.primary,
  },

  statLabel: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(8),
    color: Colors.darkgray,
    textAlign: 'center',
  },

  card: {
    backgroundColor: Colors.white,
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(12),
    elevation: 2,
  },

  sectionTitle: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    fontSize: textScale(12),
    marginBottom: moderateScale(15),
    color: Colors.black,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },

  w100: {
    width: '100%',
    paddingLeft: moderateScale(10),
  },

  w48: {
    width: '48%',
    paddingLeft: moderateScale(10),
  },

  label: {
    color: Colors.darkgray,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    fontSize: textScale(10),
    marginBottom: moderateScale(3),
  },

  value: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(9),
    color: Colors.darkgray,
    marginBottom: moderateScale(10),
  },

  actionBtn: {
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(3),
  },

  actionText: {
    color: Colors.darkgray,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_MEDIUM,
    fontSize: textScale(10),
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
