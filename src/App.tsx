import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { RoutesContainer } from "./routes";
import AppIntroSlider from "react-native-app-intro-slider";
import { initScanbotSdk } from "./utils/initScanbotSdk";
import { Text } from "components";

SplashScreen.hide();

const slides = [
  {
    key: "one",
    title: "Title 1",
    text: "Description.\nSay something cool",

    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Title 2",
    text: "Other cool stuff",

    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",

    backgroundColor: "#22bcb5",
  },
];

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // configureData();
    return () => {};
  }, []);

  const configureData = async () => {
    const result = await initScanbotSdk();
    console.log("result", result);
    setIsAppReady(true);
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    configureData();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {!isAppReady && (
        <AppIntroSlider
          renderItem={_renderItem}
          data={slides}
          onDone={_onDone}
        />
      )}
      {isAppReady && <RoutesContainer />}
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
});

export default App;
