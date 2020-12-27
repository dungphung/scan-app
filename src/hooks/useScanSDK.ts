import ScanbotSDK from "react-native-scanbot-sdk";

const useCheckLicenseScanSDK = async () => {
  const info = await ScanbotSDK.getLicenseInfo();
  if (info.isLicenseValid) {
    return true;
  }

  alert("Scanbot SDK trial period or license has expired!", 500);
  return false;
};

export { useCheckLicenseScanSDK };

export default {
  useCheckLicenseScanSDK,
};
