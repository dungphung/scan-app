import * as React from "react";
import { View } from "react-native";

import { LIBRARY_PAGE } from "@routes/pages";
import { checkLicense, startDocumentScan } from "@utils/initScanbotSdk";
import { LocalStoreImages } from "../../models";

const modelsLocal = new LocalStoreImages();

const ScanScreen = ({ navigation }) => {
  React.useEffect(() => {
    configureScan();
  }, []);

  const configureScan = async () => {
    const isPermission = await checkLicense();
    if (isPermission) {
      const result = await startDocumentScan();

      if (!result) {
        goBack();
      } else {
        await modelsLocal.addImage(result?.pages);
      }
    } else {
      goBack();
    }
  };

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return <View />;
};

export default ScanScreen;
