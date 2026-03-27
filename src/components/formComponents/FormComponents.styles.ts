import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
  textScale,
} from '../../styles/responsiveStyles';
import { FontFamily } from '../../styles/typography';

export const styles = StyleSheet.create({
  // ============ Common Container Styles ============
  container: {
    marginBottom: verticalScale(16),
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },

  label: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.darkgray,
  },

  requiredAsterisk: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.error,
    marginLeft: horizontalScale(4),
  },

  errorText: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.error,
    marginTop: verticalScale(4),
  },

  // ============ TextInput Styles ============
  input: {
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.darkgray,
    backgroundColor: Colors.white,
  },

  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.white,
  },

  // ============ Dropdown Styles ============
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  dropdownError: {
    borderColor: Colors.error,
  },

  dropdownText: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.darkgray,
    flex: 1,
  },

  placeholderText: {
    color: Colors.lightgray,
  },

  dropdownArrow: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.lightgray,
    marginLeft: horizontalScale(8),
  },

  // ============ Modal Styles ============
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    maxHeight: '80%',
    width: '85%',
    overflow: 'hidden',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[100],
  },

  modalHeaderText: {
    fontSize: textScale(12),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    color: Colors.darkgray,
  },

  modalCloseBtn: {
    fontSize: textScale(12),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_MEDIUM,
    color: Colors.lightgray,
  },

  optionItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[100],
  },

  optionItemSelected: {
    backgroundColor: Colors.offwhite,
  },

  optionText: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    color: Colors.darkgray,
  },

  optionTextSelected: {
    fontSize: textScale(10),
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_SEMI_BOLD,
    color: Colors.blue,
  },

  // ============ Toggle Button Styles ============
  toggleContainer: {
    marginBottom: verticalScale(16),
  },

  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },

  toggleButton: {
    width: moderateScale(50),
    height: verticalScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: Colors.lightgray,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(2),
    marginRight: horizontalScale(12),
  },

  toggleButtonActive: {
    backgroundColor: Colors.success,
    justifyContent: 'flex-end',
  },

  toggleCircle: {
    width: moderateScale(24),
    height: verticalScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.white,
  },

  toggleCircleActive: {
    backgroundColor: Colors.white,
  },

  toggleText: {
    fontSize: textScale(10),
    color: Colors.darkgray,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_MEDIUM,
  },
});
