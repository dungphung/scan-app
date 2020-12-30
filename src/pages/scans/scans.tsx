import * as React from "react";
import { View } from "react-native";

import { checkLicense, startDocumentScan } from "@utils/initScanbotSdk";
import { LocalStoreImages } from "../../models";

const STATUS_CANCELED = "CANCELED";

const ScanScreen = ({ navigation }) => {
  React.useEffect(() => {
    requestAnimationFrame(configureScan);
  });

  const configureScan = async () => {
    const isPermission = await checkLicense();
    if (isPermission) {
      const result = await startDocumentScan();

      if (!result || (result && result?.status === STATUS_CANCELED)) {
        goBack();
      } else {
        await LocalStoreImages.shared.addImage(result?.pages);
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
