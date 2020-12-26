import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/AntDesign";
import { HomeScreen, LibraryScreen } from "@pages/index";
import { HOME_PAGE, LIBRARY_PAGE } from "./pages";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const LibraryStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={HOME_PAGE} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name={LIBRARY_PAGE} component={LibraryScreen} />
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

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name={HOME_PAGE} component={HomeStackScreen} />
        <Tab.Screen name="Library" component={LibraryStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
