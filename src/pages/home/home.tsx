import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from "react-native";

import {
  HOME_PAGE,
  HOME_TAB,
  LIBRARY_PAGE,
  PAGE_NAME,
  SCAN_PAGE,
} from "@routes/pages";

const list = [
  {
    title: "DOCUMENT SCANNER",
    data: [
      { id: LIBRARY_PAGE, title: "Scan Document" },
      { id: LIBRARY_PAGE, title: "Import Image & Detect Document" },
      { id: LIBRARY_PAGE, title: "View Image Results" },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  const onPressItem = React.useCallback(
    (item) => {
      navigation.push(PAGE_NAME[SCAN_PAGE]);
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <SectionList
        style={styles.list}
        sections={list}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item }) => (
          <View style={styles.sectionItemContainer}>
            <TouchableOpacity onPress={() => onPressItem(item)}>
              <Text
                style={
                  item.customStyle
                    ? item.customStyle.content
                    : styles.sectionItem
                }
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: {
    marginTop: "1%",
    marginLeft: "5%",
    height: "90%",
    width: "90%",
  },
  sectionItem: {
    fontSize: 17,
    marginTop: 14,
    marginBottom: 5,
  },
  sectionItemContainer: {
    borderBottomColor: "#bdbdbd",
    borderBottomWidth: 1,
  },
  sectionHeader: {
    fontSize: 13,
    marginTop: 25,
    marginBottom: 0,
    fontWeight: "bold",
    color: "#696969",
  },
});

export default HomeScreen;
