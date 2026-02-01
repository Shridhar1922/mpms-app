import { textScale } from './responsiveStyles';

/**
 * Type definition for Font Families
 * Using 'as const' makes these values read-only and specific
 */
export const FontFamily = {
  FONT_FAMILY_PRIMARY_LIGHT: 'Poppins-Light', // 300
  FONT_FAMILY_PRIMARY_REGULAR: 'Poppins-Regular', // 400
  FONT_FAMILY_PRIMARY_MEDIUM: 'Poppins-Medium', // 500
  FONT_FAMILY_PRIMARY_SEMI_BOLD: 'Poppins-SemiBold', // 600
  FONT_FAMILY_PRIMARY_BOLD: 'Poppins-Bold', // 700
} as const;

/**
 * Type definition for Font Sizes
 * These are calculated using your responsive textScale function
 */
export const FontSize = {
  // Micro / Decorative
  XS_6: textScale(6),
  XS_8: textScale(8),

  // Body / UI
  S_10: textScale(10),
  S_12: textScale(12),
  REG_14: textScale(14),
  REG_16: textScale(16),

  // Sub-headers
  M_18: textScale(18),
  M_20: textScale(20),
  M_22: textScale(22),
  // Headers
  L_24: textScale(24),
  L_28: textScale(28),
  XL_32: textScale(32),

  // Hero / Huge
  XXL_38: textScale(38),
  XXXL_48: textScale(48),
} as const;
