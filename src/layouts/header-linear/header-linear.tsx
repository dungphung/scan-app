import { Header, Text } from "components";
import React from "react";
import { primaryColor, secondaryColor2 } from "constants/colors";
import LinearGradient from "react-native-linear-gradient";
import { ViewStyle } from "react-native";

export default function HeaderLinear({
  titleStyle,
  title,
}: {
  titleStyle?: ViewStyle;
  title?: String;
}) {
  return (
    <Header
      CustomComponent={LinearGradient}
      colors={[primaryColor, secondaryColor2]}
      start={{ x: 0.0, y: 0.5 }}
      end={{ x: 1.0, y: 0.5 }}
      centerComponent={<Text style={titleStyle}>{title}</Text>}
    />
  );
}
