import React from "react";

import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  StatusBarProps,
} from "react-native";
import { lineColor, transparentColor } from "@constants/colors";
import {
  DEFAULT_PADDING,
  DEFAULT_PADDING_2X,
  HEADER_HEIGHT,
} from "@constants/layouts";
import LinearGradient from "react-native-linear-gradient";
import isIPhoneX from "@utils/isIPhoneX";
import ItemComponent from "./item";

interface IProps {
  leftComponent?: React.ElementType | React.ReactNode;
  leftContainerStyle?: StyleProp<ViewStyle>;
  centerComponent?: React.ElementType | { text: string } | React.ReactNode;
  centerContainerStyle?: StyleProp<ViewStyle>;
  rightComponent?: React.ElementType | React.ReactNode;
  rightContainerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  placement?: "left" | "center" | "right";

  noPaddingTop?: boolean;
  statusBarProps?: StatusBarProps;
  CustomComponent?:
    | React.ComponentType<View>
    | React.ComponentType<LinearGradient>;
}

const Header: React.FC<IProps> = ({
  leftComponent,
  leftContainerStyle,

  centerComponent,
  centerContainerStyle,

  rightComponent,
  rightContainerStyle,

  backgroundColor,

  containerStyle,
  placement,
  children,
  CustomComponent,
  ...rest
}) => {
  return (
    <CustomComponent
      style={StyleSheet.flatten([
        styles.container,
        {
          paddingHorizontal: DEFAULT_PADDING_2X,
          height: isIPhoneX()
            ? DEFAULT_PADDING * 2 + HEADER_HEIGHT
            : HEADER_HEIGHT,
          paddingTop: isIPhoneX() ? DEFAULT_PADDING * 2 : 0,
        },
        backgroundColor && { backgroundColor },
        containerStyle,
      ])}
      {...rest}
    >
      <ItemComponent
        placement="left"
        style={StyleSheet.flatten([
          placement === "center" && styles.rightLeftContainer,
          leftContainerStyle,
        ])}
      >
        {children[0] || leftComponent}
      </ItemComponent>
      <ItemComponent
        placement={placement}
        style={StyleSheet.flatten([
          styles.centerContainer,
          placement !== "center" && {
            paddingHorizontal: DEFAULT_PADDING,
          },
          centerContainerStyle,
        ])}
      >
        {centerComponent}
      </ItemComponent>
      <ItemComponent
        placement="right"
        style={StyleSheet.flatten([
          placement === "center" && styles.rightLeftContainer,
          rightContainerStyle,
        ])}
      >
        {children[2] || rightComponent}
      </ItemComponent>
    </CustomComponent>
  );
};

Header.defaultProps = {
  placement: "center",
  children: [],
  leftComponent: null,
  centerComponent: null,
  rightComponent: null,
  leftContainerStyle: null,
  centerContainerStyle: null,
  rightContainerStyle: null,
  backgroundColor: null,
  backgroundImage: null,
  backgroundImageStyle: null,
  containerStyle: null,
  statusBarProps: null,
  barStyle: "default",
  theme: null,

  noPaddingTop: false,
  CustomComponent: View,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: transparentColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: lineColor,
    borderBottomWidth: 1.2,
  },
  centerContainer: {
    flex: 3,
  },
  rightLeftContainer: {
    flex: 1,
  },
});

export default Header;
