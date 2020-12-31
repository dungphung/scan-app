import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  HOME_PAGE,
  HOME_TAB,
  LIBRARY_PAGE,
  LIBRARY_TAB,
  PAGE_NAME,
  SCAN_PAGE,
} from "./pages";

export type BottomTabParamList = {
  [HOME_TAB]: undefined;
  [LIBRARY_TAB]: undefined;
};

export type RootStackParamList = {
  [SCAN_PAGE]: undefined;
};

export type ScanScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof SCAN_PAGE
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  StackNavigationProp<RootStackParamList>
>;
