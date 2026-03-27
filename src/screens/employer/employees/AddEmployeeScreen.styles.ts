import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
  textScale,
} from '../../../styles/responsiveStyles';
import { FontFamily } from '../../../styles/typography';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  formContainer: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(20),
    paddingBottom: verticalScale(40),
  },

  sectionHeader: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Colors.darkgray,
    marginTop: verticalScale(24),
    marginBottom: verticalScale(16),
    paddingBottom: verticalScale(8),
    borderBottomWidth: 2,
    borderBottomColor: Colors.blue,
  },

  uploadButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.blue,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(12),
    marginBottom: verticalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.offwhite,
  },

  uploadButtonText: {
    fontSize: moderateScale(14),
    color: Colors.blue,
    fontWeight: '600',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(24),
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: '45%',
  },

  cancelButtonText: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.darkgray,
  },

  submitButton: {
    width: '45%',
  },
});
