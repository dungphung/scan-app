import * as React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { ActionSheetCustom } from "react-native-custom-actionsheet";
import { Loading } from "@components/index";
import { ScrollView } from "react-native-gesture-handler";
import {
  applyImageFilterOnPage,
  checkLicense,
  startCroppingScreen,
} from "@utils/initScanbotSdk";
import { LocalStoreImages } from "../../models";
import { Page } from "react-native-scanbot-sdk";
import { HeaderLinear } from "layouts";
import {
  backgroundColor,
  primaryColor,
  secondaryColor2,
} from "constants/colors";
import LinearGradient from "react-native-linear-gradient";
import { LoadingModal } from "@layouts/index";

const { width } = Dimensions.get("window");

const nameOptions = [
  "None",
  "Color enhanced",
  "Grayscale",
  "Binarized",
  "Color document",
  "Pure Binarized",
  "Background clean",
  "Black and white",
  "Otsu Binarization",
  "Deep binarization",
  "Low light binarization",
  "Edge highlight",
  "Low light binarization 2",
];

const options = [
  "NONE",
  "COLOR_ENHANCED",
  "GRAYSCALE",
  "BINARIZED",
  "COLOR_DOCUMENT",
  "PURE_BINARIZED",
  "BACKGROUND_CLEAN",
  "BLACK_AND_WHITE",
  "OTSU_BINARIZATION",
  "DEEP_BINARIZATION",
  "LOW_LIGHT_BINARIZATION",
  "EDGE_HIGHLIGHT",
  "LOW_LIGHT_BINARIZATION_2",
];

function FilterImage({ navigation, route }) {
  const [image, setImage] = React.useState<Page | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const actionSheetRef = React.useRef<ActionSheetCustom>(null);

  React.useEffect(() => {
    getImage();
  }, []);

  const getImage = React.useCallback(async () => {
    const id = route.params.id;
    const img = await LocalStoreImages.shared.getImage(id);
    if (img) {
      setImage(img);
    }
  }, [route]);

  const deleteButtonPress = React.useCallback(async () => {
    if (image?.pageId) {
      await LocalStoreImages.shared.removeImage(image.pageId);
      goBack();
    }
  }, [image, goBack]);

  const handlePress = React.useCallback(
    async (index) => {
      setIsLoading(true);
      if (index > 0) {
        const filter = options[index];
        const updated = await applyImageFilterOnPage(image, filter);
        if (updated) {
          await LocalStoreImages.shared.updateImage(updated);
          getImage();
        }
      }

      setIsLoading(false);
    },
    [getImage, image]
  );

  const filterButtonPress = React.useCallback(async () => {
    const isValidLicens = await checkLicense();
    if (!isValidLicens) {
      return;
    }
    actionSheetRef.current?.show();
  }, []);

  const cropButtonPress = React.useCallback(async () => {
    const isValidLicens = await checkLicense();
    if (!isValidLicens) {
      return;
    }

    const result = await startCroppingScreen(image);

    if (result.status === "OK") {
      if (result.page) {
        await LocalStoreImages.shared.updateImage(result.page);
      }
    }
  }, []);

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <HeaderLinear title="" />
      {image ? (
        <ScrollView>
          <View style={styles.wapperItem}>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={{ uri: image.documentImageFileUri }}
            />
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}

      <LinearGradient
        style={styles.bottomBar}
        colors={[primaryColor, secondaryColor2]}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
      >
        <Text style={styles.bottomBarButton} onPress={cropButtonPress}>
          Crop & Rotate
        </Text>
        <Text style={styles.bottomBarButton} onPress={filterButtonPress}>
          Filter
        </Text>
        <Text
          style={[styles.bottomBarButton, styles.alignRight]}
          onPress={deleteButtonPress}
        >
          Delete
        </Text>
      </LinearGradient>
      <ActionSheetCustom
        ref={actionSheetRef}
        title="Filters"
        message="Choose an image filter to see how it enhances the document"
        options={nameOptions}
        cancelButtonIndex={0}
        onPress={handlePress}
      />
      <LoadingModal loading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor,
  },
  wapperItem: {
    paddingTop: 15,
    width: width - 30,
    height: (width - 30) * 1.2,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  bottomBarButton: {
    flex: 0,
    height: 50,
    lineHeight: 50,
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 13,
  },
  alignRight: {
    marginLeft: "auto",
  },
  bottomBar: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
});

export default FilterImage;
