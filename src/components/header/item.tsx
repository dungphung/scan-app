import React from "react";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";

import { Text } from "../text";
import { Icon } from "../icon";

interface IProps {
  style: StyleProp<ViewStyle>;
  placement: "left" | "right" | "center" | undefined;
  children:
    | {
        text: string;
        name: string;
        containerStyle: StyleProp<ViewStyle>;
      }
    | undefined;
}

const ALIGN_STYLE = {
  left: "flex-start",
  right: "flex-end",
  center: "center",
};

const ItemComponent: React.FC<IProps> = ({ style, placement, children }) => {
  return (
    <View
      style={StyleSheet.flatten([
        style,
        { alignItems: ALIGN_STYLE[placement] },
      ])}
    >
      {!!children && !!children.text && (
        <Text numberOfLines={1} fontSize={18} {...children}>
          {children.text}
        </Text>
      )}
      {!!children && !!children.name && (
        <Icon
          containerStyle={StyleSheet.flatten([
            { alignItems: ALIGN_STYLE[placement] },
            children.containerStyle,
          ])}
          {...children}
        />
      )}
      {!!children && !children.name && !children.text && children}
    </View>
  );
};

ItemComponent.defaultProps = {
  style: null,
  placement: "center",
};

export default ItemComponent;
