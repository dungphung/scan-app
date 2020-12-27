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
        name={PAGE_NAME[HOME_PAGE]}
        component={HomeScreen}
      />
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name={PAGE_NAME[SCAN_PAGE]}
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
        name={PAGE_NAME[LIBRARY_PAGE]}
        component={LibraryScreen}
      />
      <LibraryStack.Screen
        options={{
          headerShown: false,
        }}
        name={PAGE_NAME[FILTER_PAGE]}
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

            if (route.name === HOME_PAGE) {
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
        <Tab.Screen name={PAGE_NAME[HOME_TAB]} component={HomeStackScreen} />
        <Tab.Screen
          name={PAGE_NAME[LIBRARY_TAB]}
          component={LibraryStackScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
