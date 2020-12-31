import * as React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { SCAN_PAGE } from "@routes/pages";
import { Divider, Text, Icon } from "@components/index";
import {
  backgroundColor,
  itemBackgroundColor,
  whiteColor,
} from "@constants/colors";

import { DEFAULT_PADDING, WIDTH_SCREEN } from "@constants/layouts";
import { HeaderLinear } from "@layouts/index";
import { ProfileScreenNavigationProp } from "@routes/type.routes";

type dataType = {
  id: Number;
  title: String;
  iconName: String;
  iconType: String;
};

const data: dataType[] = [
  {
    id: 1,
    title: "Scan Document",
    iconName: "magnify-scan",
    iconType: "MaterialCommunityIcons",
  },
];

const ITEM_WITDH = (WIDTH_SCREEN - DEFAULT_PADDING * 4) / 2;

interface IProps {
  navigation: ProfileScreenNavigationProp;
}

const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  const onPressItem = React.useCallback(() => {
    navigation.push(SCAN_PAGE);
  }, [navigation]);

  const renderItem = React.useCallback(({ item }: { item: dataType }) => {
    return (
      <View style={styles.section}>
        <View style={styles.sectionItemContainer}>
          <TouchableOpacity onPress={onPressItem}>
            <Icon
              name={item.iconName}
              type={item.iconType}
              size={40}
              color={whiteColor}
            />
            <Text style={styles.sectionItem}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const ItemSeparatorComponent = React.useCallback(() => {
    return <Divider containerStyle={{ paddingVertical: DEFAULT_PADDING }} />;
  }, []);

  const keyExtractor = React.useCallback((item: dataType) => {
    return `${item.id}`;
  }, []);

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
    fontSize: 15,
    textAlign: "center",
    color: whiteColor,
    fontWeight: "bold",
    marginTop: 8,
  },
  section: {
    width: ITEM_WITDH,
    height: ITEM_WITDH * 0.7,
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
