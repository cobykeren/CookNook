import { SafeAreaView, View, StyleSheet } from "react-native";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import LibraryScreen from "./LibraryScreen";
import customTheme from "./theme";
export default function Index() {
  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <LibraryScreen />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
});
