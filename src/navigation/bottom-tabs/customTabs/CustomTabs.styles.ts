import { Platform, StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../../../styles/typography';
import { moderateScale, scale, textScale, verticalScale } from '../../../styles/responsiveStyles';
import { Colors } from '../../../styles/colors';

export const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    height: verticalScale(80),
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gainsboro,
  },
  tabItemContainer: {
    gap: 6,
    borderTopColor: Colors.blue,
    height: '100%',
    width: '25%',
  },
  tabImage: {
    width: scale(22),
    height: verticalScale(22),
  },
  tabTitle: {
    fontSize: FontSize.XS_8,
  },
  plusButton: {
    position: 'absolute',
    paddingTop: moderateScale(Platform.OS === 'ios' ? 0 : 0),
    bottom: scale(55),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#007AFF',
    width: scale(55),
    height: scale(55),
    borderRadius: 30,
    elevation: 5,
  },

  plusText: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_LIGHT,
    fontSize: textScale(30),
    color: Colors.white,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalMenu: {
    backgroundColor: '#fff',
    paddingVertical: moderateScale(40),
    paddingHorizontal: moderateScale(20),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    //alignItems: 'center',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
  },

  menuItem: {
    paddingVertical: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    paddingHorizontal: moderateScale(10),
    width: '29%',
    backgroundColor: Colors.grey[100],
    alignItems: 'center',
    borderRadius: 5,
  },
  modalImg: {
    width: scale(20),
    height: verticalScale(20),
    marginBottom: moderateScale(10),
    alignItems: 'center',
  },
  menuText: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(7),
    textAlign: 'center',
  },
});
