import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { RoutesContainer } from "./routes";
import { initScanbotSdk } from "./utils/initScanbotSdk";
declare const global: { HermesInternal: null | {} };

SplashScreen.hide();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    configureData();
    return () => {};
  }, []);

  const configureData = async () => {
    const result = await initScanbotSdk();
    console.log("result", result);
    setIsAppReady(true);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {isAppReady && <RoutesContainer />}
    </>
  );
};

export default App;
