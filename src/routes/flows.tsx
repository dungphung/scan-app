import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/AntDesign";
import {
  FilterImage,
  HomeScreen,
  LibraryScreen,
  ScanScreen,
} from "@pages/index";
import {
  FILTER_PAGE,
  HOME_PAGE,
  HOME_TAB,
  LIBRARY_PAGE,
  LIBRARY_TAB,
  PAGE_NAME,
  SCAN_PAGE,
} from "./pages";
import {
  itemBackgroundColor,
  primaryColor,
  whiteColor,
} from "constants/colors";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const LibraryStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name={HOME_PAGE}
        component={HomeScreen}
      />
      <HomeStack.Screen
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
        name={SCAN_PAGE}
        component={ScanScreen}
      />
    </HomeStack.Navigator>
  );
};

const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        options={{
          headerShown: false,
        }}
        name={LIBRARY_PAGE}
        component={LibraryScreen}
      />
      <LibraryStack.Screen
        options={{
          headerShown: false,
        }}
        name={FILTER_PAGE}
        component={FilterImage}
      />
    </LibraryStack.Navigator>
  );
};

export default function RoutesContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === HOME_TAB) {
              iconName = focused ? "home" : "home";
            } else {
              iconName = focused ? "appstore-o" : "appstore-o";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: primaryColor,
          inactiveTintColor: whiteColor,
          style: {
            backgroundColor: itemBackgroundColor,
          },
        }}
      >
        <Tab.Screen
          name={HOME_TAB}
          component={HomeStackScreen}
          options={{ title: PAGE_NAME[HOME_TAB] }}
        />
        <Tab.Screen
          name={LIBRARY_TAB}
          component={LibraryStackScreen}
          options={{ title: PAGE_NAME[LIBRARY_TAB] }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
