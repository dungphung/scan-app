import { Dimensions } from "react-native";

const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("window");

export { HEIGHT_SCREEN, WIDTH_SCREEN };

export const DEFAULT_PADDING = 15;
export const DEFAULT_PADDING_2X = DEFAULT_PADDING * 2;

export const DEFAUT_MARGIN = 15;

export const ICON_SIZE_SMALL = 8;

export const ICON_SIZE_REGULAR = ICON_SIZE_SMALL * 2;

export const ICON_SIZE_MEDIUM = ICON_SIZE_SMALL * 3;

export const ICON_SIZE_LARGE = ICON_SIZE_SMALL * 4;

export const HEADER_HEIGHT = 60;
