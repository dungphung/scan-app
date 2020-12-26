import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text>LibraryScreen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default LibraryScreen;
