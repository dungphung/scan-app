import * as React from "react";
import { View } from "react-native";

import { LIBRARY_PAGE } from "@routes/pages";
import { checkLicense, startDocumentScan } from "@utils/initScanbotSdk";

const ScanScreen = ({ navigation }) => {
  const configureScan = async () => {
    const isPermission = await checkLicense();
    if (isPermission) {
      const result = await startDocumentScan();
      console.log(result);

      if (!result) {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    configureScan();
  }, []);

  return <View />;
};

export default ScanScreen;
