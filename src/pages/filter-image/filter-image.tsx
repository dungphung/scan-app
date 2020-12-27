import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, Image } from "react-native";
// import { ActionSheetCustom } from "react-native-custom-actionsheet";
import { LocalStoreImages } from "../../models";

const CANCEL_INDEX = 0;

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

const modelsLocal = new LocalStoreImages();

function FilterImage() {
  const [images, setImages] = useState([]);
  React.useEffect(() => {
    getImage();
  }, []);

  const getImage = React.useCallback(async () => {
    const listImage = await modelsLocal.getListImage();
    setImages(listImage);
  }, []);

  const deleteButtonPress = React.useCallback(() => {}, []);

  const handlePress = React.useCallback(() => {}, []);

  const filterButtonPress = React.useCallback(() => {}, []);

  const cropButtonPress = React.useCallback(() => {}, []);

  return (
    <>
      <SafeAreaView />
      <Image
        style={styles.image}
        resizeMode={"contain"}
        // source={{ uri: Pages.selectedPage.documentImageFileUri }}
        // key={Pages.selectedPage.pageId}
      />
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarButton} onPress={cropButtonPress}>
          CROP & ROTATE
        </Text>
        <Text style={styles.bottomBarButton} onPress={filterButtonPress}>
          FILTER
        </Text>
        <Text
          style={[styles.bottomBarButton, styles.alignRight]}
          onPress={deleteButtonPress}
        >
          DELETE
        </Text>
      </View>
      {/* <ActionSheetCustom
        // ref={this.getActionSheetRef}
        title={"Filters"}
        message="Choose an image filter to see how it enhances the document"
        options={options}
        cancelButtonIndex={0}
        onPress={handlePress}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: {
    width: "94%",
    height: "70%",
    marginLeft: "3%",
    marginTop: "3%",
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
