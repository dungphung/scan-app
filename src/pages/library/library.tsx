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

const modelsLocal = new LocalStoreImages();

function LibraryScreen({ navigation }) {
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    getImage();
  }, []);

  const onPressItem = React.useCallback((item) => {}, []);

  const getImage = React.useCallback(async () => {
    const listImage = await modelsLocal.getListImage();
    console.log(listImage);

    setImages(listImage);
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={onPressItem}>
        <View style={styles.wapperItem}>
          <Image
            style={styles.image}
            resizeMode={"contain"}
            source={{ uri: item.url }}
          />
        </View>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = React.useCallback((item) => {
    return item.id;
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
