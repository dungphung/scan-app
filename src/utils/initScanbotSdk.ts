import { LICENSE_KEY } from "@constants/constants";
import { Platform } from "react-native";
import ScanbotSDK, {
  CroppingResult,
  DocumentScannerConfiguration,
  InitializationOptions,
} from "react-native-scanbot-sdk";

import { DocumentDirectoryPath, ExternalDirectoryPath } from "react-native-fs";

const options: InitializationOptions = {
  licenseKey: LICENSE_KEY,
  loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
  storageImageFormat: "JPG",
  storageImageQuality: 80,
  storageBaseDirectory: getCustomStoragePath(), // Optional custom storage path. See comments below!
  documentDetectorMode: "ML_BASED",
};

console.log(options);

const config: DocumentScannerConfiguration = {
  polygonColor: "#00ffff",
  bottomBarBackgroundColor: "#c8193c",
  topBarBackgroundColor: "#c8193c",
  cameraBackgroundColor: "#c8193c",
  orientationLockMode: "PORTRAIT",
  pageCounterButtonTitle: "%d Page(s)",
  multiPageEnabled: true,
  ignoreBadAspectRatio: true,
  autoSnappingSensitivity: 0.85,
};

function getCustomStoragePath() {
  if (Platform.OS === "ios") {
    return DocumentDirectoryPath + "/my-custom-storage";
  } else if (Platform.OS === "android") {
    return ExternalDirectoryPath + "/my-custom-storage";
  }
  return "";
}

async function initScanbotSdk() {
  try {
    return await ScanbotSDK.initializeSDK(options);
  } catch (error) {
    console.log("initScanbotSdk error", error);
    return null;
  }
}

async function startDocumentScan() {
  try {
    const result = await ScanbotSDK.UI.startDocumentScanner(config);
    console.log(result);

    return result;
  } catch (error) {
    console.log("startDocumentScan error: ", error);
    return null;
  }
}

async function checkLicense() {
  try {
    const info = await ScanbotSDK.getLicenseInfo();

    console.log("error: ", info);

    if (info.isLicenseValid) {
      return true;
    }
  } catch (error) {
    console.log("checkLicense error: ", error);
  }

  return false;
}

async function startCroppingScreen(selectedImage): Promise<CroppingResult> {
  try {
    const result = await ScanbotSDK.UI.startCroppingScreen(selectedImage, {
      doneButtonTitle: "Apply",
      topBarBackgroundColor: "#c8193c",
      bottomBarBackgroundColor: "#c8193c",
    });

    return result;
  } catch (error) {
    console.log("startCroppingScreen error: ", error);
  }

  return null;
}

async function applyImageFilterOnPage(selectedImage, filter) {
  try {
    const updated = await ScanbotSDK.applyImageFilterOnPage(
      selectedImage,

      filter
    );

    return updated;
  } catch (error) {
    console.log("applyImageFilterOnPage error: ", error);
  }

  return null;
}

export default {
  initScanbotSdk,
  startDocumentScan,
  checkLicense,
  startCroppingScreen,
  applyImageFilterOnPage,
};

export {
  initScanbotSdk,
  startDocumentScan,
  checkLicense,
  startCroppingScreen,
  applyImageFilterOnPage,
};
