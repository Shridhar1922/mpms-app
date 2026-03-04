import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Colors } from '../../styles/colors';

interface AppIconProps {
  name: string; // SVG XML string
  size?: number;
  color?: string;
  iconStyle?: object;
}

const AppIcon: React.FC<AppIconProps> = ({ name, size = 20, color = Colors.white, iconStyle }) => {
  return <SvgXml xml={name} width={size} height={size} fill={color} {...iconStyle} />;
};

export default AppIcon;
