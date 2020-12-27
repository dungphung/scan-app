import * as React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { PAGE_NAME, SCAN_PAGE } from "@routes/pages";
import { Divider, Text } from "@components/index";
import {
  backgroundColor,
  itemBackgroundColor,
  whiteColor,
} from "@constants/colors";

import { DEFAULT_PADDING, WIDTH_SCREEN } from "@constants/layouts";
import { HeaderLinear } from "layouts";

const data = [
  { id: 1, title: "Scan Document" },
  { id: 2, title: "Import Image & Detect Document" },
  { id: 3, title: "View Image Results" },
];

const ITEM_WITDH = (WIDTH_SCREEN - DEFAULT_PADDING * 4) / 2;

const HomeScreen = ({ navigation }) => {
  const onPressItem = React.useCallback(
    (item) => {
      navigation.push(PAGE_NAME[SCAN_PAGE]);
    },
    [navigation]
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.section}>
        <View style={styles.sectionItemContainer}>
          <TouchableOpacity onPress={() => onPressItem(item)}>
            <Text style={styles.sectionItem}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ItemSeparatorComponent = () => {
    return <Divider containerStyle={{ paddingVertical: DEFAULT_PADDING }} />;
  };

  const keyExtractor = (item) => {
    return item.id;
  };

  return (
    <View style={styles.container}>
      <HeaderLinear title="Document scan" titleStyle={styles.titleStyle} />
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ paddingTop: DEFAULT_PADDING * 2 }}
          ItemSeparatorComponent={ItemSeparatorComponent}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: backgroundColor },
  content: {
    flex: 1,
  },
  sectionItem: {
    fontSize: 14,
    textAlign: "center",
    color: whiteColor,
    fontWeight: "bold",
  },
  section: {
    width: ITEM_WITDH,
    height: (ITEM_WITDH * 1) / 2,
    marginHorizontal: DEFAULT_PADDING,
    borderRadius: 20,
  },
  sectionItemContainer: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: itemBackgroundColor,
  },
  sectionHeader: {},
  titleStyle: { fontSize: 18, color: whiteColor, fontWeight: "bold" },
});

export default HomeScreen;
