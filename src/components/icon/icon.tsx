import React from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { blackColor } from "@constants/colors";

import getIconTypes from "@utils/getIconTypes";

export interface IIconProps {
  isAnimated?: boolean;
  type?: string;
  name?: string;
  size?: number;
  color?: string;
  iconStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?(): void;
}

const Icon: React.FC<IIconProps> = ({
  type,
  name,
  size,
  color,
  iconStyle,
  containerStyle,
  onPress,
}) => {
  const Component: React.ElementType = onPress ? TouchableOpacity : View;
  const IconComponent = getIconTypes(type);

  return (
    <Component
      style={StyleSheet.flatten([styles.container, containerStyle])}
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={1}
    >
      <IconComponent
        style={StyleSheet.flatten([styles.iconStyle, iconStyle])}
        size={size}
        name={name}
        color={color}
      />
    </Component>
  );
};

Icon.defaultProps = {
  containerStyle: null,
  onPress: null,
  iconStyle: null,
  size: 24,
  color: blackColor,
  isAnimated: false,
  type: "simple-line-icon",
};

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  iconStyle: {},
});

export default Icon;
