import { SafeAreaView, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import LibraryScreen from "./LibraryScreen";
import customTheme from "./theme";
import SignInScreen from "./authentication/SignInScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/LibraryScreen"); // Redirect LibraryScreen if authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <SignInScreen />
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
