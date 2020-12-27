import React from "react";
import {
  StyleSheet,
  Text as RNText,
  TextStyle,
  TextProps,
  StyleProp,
  Platform,
} from "react-native";
import { textColor } from "@constants/Colors";

export interface IPropsText extends TextProps {
  style?: StyleProp<TextStyle>;
  color?: string;
  isNumber?: boolean;
  weight: "Regular" | "Medium" | "Light" | "SemiBold";
}

const Text: React.FC<IPropsText> = ({
  children,
  style,
  weight,
  ...attriblue
}) => (
  <RNText
    style={StyleSheet.flatten([
      styles.text,
      //   { fontFamily: `Poppins-${weight}` },
      style,
      Platform.OS === "android" && {
        includeFontPadding: false,
        textAlignVertical: "center",
      },
    ])}
    {...attriblue}
  >
    {children}
  </RNText>
);

Text.defaultProps = {
  weight: "Medium",
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    // fontFamily: "Poppins-Light",
    color: textColor,
  },
});

export default Text;
