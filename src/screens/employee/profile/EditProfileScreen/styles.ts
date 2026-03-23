import { StyleSheet } from 'react-native';
import { moderateScale, scale, textScale } from '../../../../styles/responsiveStyles';
import { Colors } from '../../../../styles/colors';
import { FontFamily } from '../../../../styles/typography';
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  datePickerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  datePickerModalContent: {
    backgroundColor: Colors.white,
    margin: moderateScale(20),
    borderRadius: moderateScale(10),
    padding: moderateScale(16),
  },
  datePickerDoneButton: {
    marginTop: moderateScale(10),
    alignItems: 'center',
  },
  datePickerDoneButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingBottom: moderateScale(100),
  },
  scrollContainer: {
    // flex: 1,
    paddingTop: moderateScale(20),
    //paddingBottom: moderateScale(250), // Extra space for the fixed save button
    paddingHorizontal: moderateScale(16),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    elevation: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.white,
    flexGrow: 1,
    paddingBottom: moderateScale(200),
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: moderateScale(30),
    // marginBottom: moderateScale(20),
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: 100,
    backgroundColor: Colors.offwhite,
  },
  placeholderImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: 100,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconStyle: {
    width: scale(24),
    height: scale(24),
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: scale(12),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageText: {
    marginTop: moderateScale(8),
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(15),
  },
  label: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(9),
    color: Colors.black,
    marginBottom: moderateScale(4),
    marginTop: moderateScale(8),
  },
  value: {
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_REGULAR,
    fontSize: textScale(8),
    color: Colors.black,
    marginBottom: moderateScale(8),
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: moderateScale(6),
    padding: moderateScale(10),
    fontSize: textScale(10),
    marginBottom: moderateScale(8),
    backgroundColor: Colors.white,
  },
  addressInput: {
    minHeight: scale(80),
    maxHeight: scale(120),
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  saveButtonText: {
    color: Colors.white,
    fontFamily: FontFamily.FONT_FAMILY_PRIMARY_BOLD,
    fontSize: textScale(12),
  },
  fixedSaveButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    padding: moderateScale(16),
    borderTopWidth: moderateScale(1),
    borderTopColor: Colors.offwhite,
    zIndex: 10,
  },
});

export default styles;
