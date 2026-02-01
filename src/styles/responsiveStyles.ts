import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

// Constants for layout logic
const isTablet: boolean = DeviceInfo.isTablet();
const guidelineBaseWidth: number = 375;
const guidelineBaseHeight: number = 812;

/**
 * Basic scaling based on width
 */
const scale = (size: number): number => (width / guidelineBaseWidth) * size;

/**
 * Scaling based on height (useful for margins/paddings)
 */
const verticalScale = (size: number): number => (height / guidelineBaseHeight) * size;

/**
 * Scaling based on width (alias for scale)
 */
const horizontalScale = (size: number): number => (width / guidelineBaseWidth) * size;

/**
 * Moderate scaling: provides a middle ground between fixed and fully fluid.
 * @param factor - 0.5 is default. Higher means more responsive, lower means more fixed.
 */
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

/**
 * Moderate scaling for vertical dimensions
 */
const moderateScaleVertical = (size: number, factor: number = 0.5): number =>
  size + (verticalScale(size) - size) * factor;

/**
 * Responsive Font scaling
 * Uses 580 as the standard reference height for font calculation
 */
const textScale = (percent: number): number => {
  return RFValue(percent, 580);
};

export {
  scale,
  verticalScale,
  textScale,
  moderateScale,
  moderateScaleVertical,
  width,
  height,
  horizontalScale,
  isTablet,
};
