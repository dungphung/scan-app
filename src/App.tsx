import "react-native-gesture-handler";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { RoutesContainer } from "./routes";
import AppIntroSlider from "react-native-app-intro-slider";

import { Loading, Text } from "components";
import { useCheckAppReady } from "@hooks/useCheckAppReady";

import { setIntroAppStatus as setLocalIntroAppStatus } from "@models/localStoreIntroApp";
import LinearGradient from "react-native-linear-gradient";
import { primaryColor, secondaryColor2 } from "constants/colors";

SplashScreen.hide();

const slides = [
  {
    key: "two",
    title: "Welcome to Scan App",
    text: "",
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Easy to use and save your time",
    text: "",
    backgroundColor: "#22bcb5",
  },
];

const App = () => {
  const [isAppReady, introAppStatus, setIntroAppStatus] = useCheckAppReady();

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _onDone = async () => {
    await setLocalIntroAppStatus();
    setIntroAppStatus("1");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {!isAppReady && (
        <LinearGradient
          style={styles.loadingStyle}
          colors={[primaryColor, secondaryColor2]}
        >
          <Loading />
        </LinearGradient>
      )}
      {isAppReady && !introAppStatus && (
        <AppIntroSlider
          renderItem={_renderItem}
          data={slides}
          onDone={_onDone}
        />
      )}

      {isAppReady && !!introAppStatus && <RoutesContainer />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingStyle: { flex: 1, alignItems: "center", justifyContent: "center" },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22bcb5",
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
