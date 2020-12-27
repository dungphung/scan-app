import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Divider } from "@components/index";

import { LocalStoreImages } from "../../models";
import { FILTER_PAGE, PAGE_NAME } from "routes/pages";
import { useFocusEffect } from "@react-navigation/native";

const modelsLocal = new LocalStoreImages();

function LibraryScreen({ navigation }) {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    getImage();
  }, []);

  useFocusEffect(() => {
    modelsLocal.refresh();
  });

  const onPressItem = React.useCallback((item) => {
    console.log(item);
    navigation.navigate(PAGE_NAME[FILTER_PAGE], {
      id: item.pageId,
    });
  }, []);

  const getImage = React.useCallback(async () => {
    const listImage = modelsLocal.getListImage();
    setImages(listImage);
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)}>
        <View style={styles.wapperItem}>
          <Image
            style={styles.image}
            resizeMode={"contain"}
            source={{ uri: item.documentImageFileUri }}
          />
        </View>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = React.useCallback((item) => {
    return item.pageId;
  }, []);

  const ItemSeparatorComponent = React.useCallback(() => {
    return <Divider containerStyle={styles.dividerStyle} />;
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  wapperItem: {
    width: 200,
    height: 200,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  dividerStyle: {
    paddingVertical: 15,
  },
});

export default LibraryScreen;
