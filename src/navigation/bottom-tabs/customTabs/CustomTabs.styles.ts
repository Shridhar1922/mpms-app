import { StyleSheet } from 'react-native';
import { FontSize } from '../../../styles/typography';
import { scale, verticalScale } from '../../../styles/responsiveStyles';
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
});
