import AsyncStorage from "@react-native-async-storage/async-storage";

const INTRO_APP_STOREGAE = "INTRO_APP_STOREGAE";

const setIntroAppStatus = async () => {
  try {
    return await AsyncStorage.setItem(INTRO_APP_STOREGAE, "1");
  } catch (error) {
    console.log("setIntroAppStatus error", error);

    return null;
  }
};

const getIntroAppStatus = async () => {
  try {
    return await AsyncStorage.getItem(INTRO_APP_STOREGAE);
  } catch (error) {
    console.log("getIntroAppStatus error", error);
    return null;
  }
};

export default {
  getIntroAppStatus,
  setIntroAppStatus,
};

export { getIntroAppStatus, setIntroAppStatus };
