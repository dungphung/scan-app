import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";

interface ILoading {
  width?: number;
  height?: number;
  fullScreen?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const Loading: React.FC<ILoading> = ({
  width,
  height,
  fullScreen,
  containerStyle,
}) => (
  <View
    style={[
      styles.animationContainer,
      fullScreen && styles.fullScreenStyle,
      containerStyle,
      { width, height },
    ]}
  >
    <ActivityIndicator size="small" color="white" />
  </View>
);

Loading.defaultProps = {
  width: 100,
  height: 100,
};

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreenStyle: {
    flex: 1,
  },
});

export default Loading;
