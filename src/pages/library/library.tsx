import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Divider } from "@components/index";

import { LocalStoreImages } from "../../models";
import { FILTER_PAGE } from "routes/pages";
import { useIsFocused } from "@react-navigation/native";
import { HeaderLinear } from "layouts";
import { backgroundColor, whiteColor } from "constants/colors";
import { DEFAULT_PADDING } from "constants/layouts";
import { Page } from "react-native-scanbot-sdk";

function LibraryScreen({ navigation }) {
  const [images, setImages] = React.useState<Page[]>([]);
  const isFocused = useIsFocused();

  const getImage = () => {
    const listImage = LocalStoreImages.shared.getListImage();

    setImages(listImage);
  };

  React.useEffect(() => {
    getImage();
  }, [isFocused]);

  const onPressItem = React.useCallback(
    (item) => {
      console.log(item);
      navigation.navigate(FILTER_PAGE, {
        id: item.pageId,
      });
    },
    [navigation]
  );

  const renderItem = ({ item }: { item: Page }) => {
    return (
      <View style={styles.buttonStyle}>
        <TouchableOpacity onPress={() => onPressItem(item)}>
          <View style={styles.wapperItem}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: item.documentImageFileUri }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorComponent = React.useCallback(() => {
    return <Divider containerStyle={styles.dividerStyle} />;
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLinear title="Library" titleStyle={styles.titleStyle} />
      <FlatList
        numColumns={2}
        extraData={images}
        contentContainerStyle={styles.contentStyle}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.pageId;
        }}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: backgroundColor },
  wapperItem: {
    width: 150,
    height: 200,
  },
  buttonStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  dividerStyle: {
    paddingVertical: DEFAULT_PADDING,
  },
  titleStyle: { fontSize: 18, color: whiteColor, fontWeight: "bold" },
  contentStyle: {
    paddingTop: DEFAULT_PADDING * 2,
  },
});

export default LibraryScreen;
