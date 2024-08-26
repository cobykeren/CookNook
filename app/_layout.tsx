import { Stack } from "expo-router";
import { RecipesProvider } from "./context/RecipesContext";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import customTheme from "./theme";

export default function RootLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Deletion cancelled"),
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              await signOut(auth);
              console.log("User logged out");
              router.replace("/");
            },
            style: "default",
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <RecipesProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  title: "CookNook 🍽️",
                  animation: "slide_from_left",
                }}
              />
              <Stack.Screen
                name="LibraryScreen"
                options={{
                  title: "CookNook 🍽️",
                  headerRight: () => (
                    <Button mode="text" onPress={handleLogout}>
                      Logout
                    </Button>
                  ),
                }}
              />
              <Stack.Screen
                name="authentication/SignInScreen"
                options={{ title: "Sign In", animation: "slide_from_left" }}
              />
              <Stack.Screen
                name="authentication/SignUpScreen"
                options={{ title: "Sign Up" }}
              />
              <Stack.Screen
                name="recipe/[id]"
                options={{ title: "My Recipe" }}
              />
              <Stack.Screen
                name="recipe/NewRecipe"
                options={{ title: "New Recipe" }}
              />
            </Stack>
          </RecipesProvider>
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
