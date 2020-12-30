import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { ActionSheetCustom } from "react-native-custom-actionsheet";
import { Loading } from "@components/index";
import { ScrollView } from "react-native-gesture-handler";
import {
  applyImageFilterOnPage,
  checkLicense,
  startCroppingScreen,
} from "@utils/initScanbotSdk";
import { LocalStoreImages } from "../../models";

const { width, height } = Dimensions.get("window");

const CANCEL_INDEX = 0;

const options = [
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

const modelsLocal = new LocalStoreImages();

function FilterImage({ navigation, route }) {
  const [image, setImage] = React.useState(null);

  const actionSheetRef = React.useRef(null);

  React.useEffect(() => {
    getImage();
  }, []);

  const getImage = React.useCallback(async () => {
    const id = route.params.id;
    const image = await modelsLocal.getImage(id);
    setImage(image);
  }, [route]);

  const deleteButtonPress = React.useCallback(async () => {
    await modelsLocal.removeImage(image?.id);
    goBack();
  }, [image]);

  const handlePress = React.useCallback(async (index) => {
    // this.setState({selected: index});
    if (index >= 0) {
      const filter = options[index];
      const updated = await applyImageFilterOnPage(image, filter);
      // this.updateCurrentPage(updated);
      await modelsLocal.updateImage(updated);
      getImage();
    }
  }, []);

  const filterButtonPress = React.useCallback(async () => {
    const isValidLicens = await checkLicense();
    if (!isValidLicens) {
      return;
    }
    actionSheetRef.current.show();
  }, []);

  const cropButtonPress = React.useCallback(async () => {
    const isValidLicens = await checkLicense();
    if (!isValidLicens) {
      return;
    }

    const result = await startCroppingScreen(image);

    if (result.status === "OK") {
      if (result.page) {
        await modelsLocal.updateImage(result.page);
      }
    }
  }, []);

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
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

      <View style={styles.bottomBar}>
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
      </View>
      <ActionSheetCustom
        ref={actionSheetRef}
        title={"Filters"}
        message="Choose an image filter to see how it enhances the document"
        options={options}
        cancelButtonIndex={0}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
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
