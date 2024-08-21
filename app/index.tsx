import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import LibraryScreen from "./LibraryScreen";

export default function Index() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <LibraryScreen />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
