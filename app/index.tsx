import { SafeAreaView, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import customTheme from "./theme";
import SignInScreen from "./authentication/SignInScreen";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:");
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          // Check if the user document exists, if not, create it
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            // Create the user document with initial data
            await setDoc(userDocRef, {
              email: user.email,
              createdAt: new Date(),
            });
            // Create initial recipe collection
            console.log("New user document created in Firestore:", user.uid);
            const recipesCollectionRef = collection(
              db,
              "users",
              user.uid,
              "recipes"
            );

            await addDoc(recipesCollectionRef, {
              title: "Welcome! Click Me!",
              body: "This is a Demo Recipe. Get started by adding your first recipe. Delete this one when you're ready, and click the New Recipe button to add your own!",
              rating: 5,
              dateCreated: serverTimestamp(),
            });

            console.log("Starter Recipe added to Firestore");
          } else {
            console.log("User already exists in Firestore:", user.uid);
          }
        } catch (error) {
          console.error("Error adding user to Firestore:", error);
        }
        router.replace("/LibraryScreen");
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
