import "react-native-gesture-handler";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { RoutesContainer } from "./routes";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

// import ScanbotSDK from "react-native-scanbot-sdk";

// async function initializeSDK() {
//   const options = {
//     licenseKey: licenseKey, // Optional license key (empty for trial mode)
//     loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
//     storageImageFormat: "JPG", // Optional image format - JPG or PNG. Default is JPG.
//     storageImageQuality: 80, // Optional image JPG quality. Default is 80.
//     // storageBaseDirectory: myCustomStoragePath(), // Optional custom storage path.
//     // The new and improved ML-based document detection is available from
//     // ScanbotSDK react-native 4.1.0 and requires iOS 11.2:
//     documentDetectorMode: "ML_BASED",
//   };
//   try {
//     const result = await ScanbotSDK.initializeSDK(options);
//     // initialization succeeded
//   } catch (err) {
//     // initialization failed
//   }
// }

declare const global: { HermesInternal: null | {} };

SplashScreen.hide();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <RoutesContainer />
    </>
  );
};

export default App;
