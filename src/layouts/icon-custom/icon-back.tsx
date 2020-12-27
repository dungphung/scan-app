import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Icon, IIconProps } from "components";
import { whiteColor } from "@constants/colors";
import { DEFAULT_PADDING_2X, ICON_SIZE_MEDIUM } from "@constants/layouts";

interface IProps {
  onPress: () => void;
  iconProps?: IIconProps;
  containerStyle?: StyleProp<ViewStyle>;
}

const IconBack: React.FC<IProps> = ({ onPress, iconProps, containerStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      activeOpacity={1}
      onPress={onPress}
    >
      <Icon
        type="Ionicons"
        name="ios-arrow-back"
        size={ICON_SIZE_MEDIUM}
        color={whiteColor}
        {...iconProps}
      />
    </TouchableOpacity>
  );
};

export default IconBack;

const styles = StyleSheet.create({
  container: {
    paddingRight: DEFAULT_PADDING_2X,
    paddingVertical: DEFAULT_PADDING_2X / 2,
  },
});
