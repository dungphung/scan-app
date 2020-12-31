import React, { memo } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { lineColor } from "@constants/colors";

interface IProps {
  backgroundColor?: string;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const areEqual = (prevProps: IProps, nextProps: IProps) => {
  return (
    prevProps.backgroundColor === nextProps.backgroundColor &&
    prevProps.height === nextProps.height &&
    prevProps.containerStyle === nextProps.containerStyle
  );
};

const Divider: React.FC<IProps> = ({
  backgroundColor,
  height,
  containerStyle,
}) => (
  <View
    style={StyleSheet.flatten([
      styles.container,
      { height, backgroundColor },
      containerStyle,
    ])}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: lineColor,
    height: 1,
  },
});

Divider.defaultProps = {
  height: 1,
};

export default memo(Divider, areEqual);
