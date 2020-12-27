import { WIDTH_SCREEN, HEIGHT_SCREEN } from "@constants/layouts";
import { Platform } from "react-native";

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;

const IPHONE12_H = 844;
const IPHONE12_Max = 926;
const IPHONE12_Mini = 780;

const isIPhoneX = () => {
  return (
    (Platform.OS === "ios" &&
      ((HEIGHT_SCREEN === X_HEIGHT && WIDTH_SCREEN === X_WIDTH) ||
        (HEIGHT_SCREEN === X_WIDTH && WIDTH_SCREEN === X_HEIGHT))) ||
    (HEIGHT_SCREEN === XSMAX_HEIGHT && WIDTH_SCREEN === XSMAX_WIDTH) ||
    (HEIGHT_SCREEN === XSMAX_WIDTH && WIDTH_SCREEN === XSMAX_HEIGHT) ||
    HEIGHT_SCREEN === IPHONE12_H ||
    HEIGHT_SCREEN === IPHONE12_Max ||
    HEIGHT_SCREEN === IPHONE12_Mini
  );
};

export default isIPhoneX;
