import { Stack } from "expo-router";
import { RecipesProvider } from "./context/RecipesContext";

export default function RootLayout() {
  return (
    <RecipesProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "CookNook 🍽️" }} />
        <Stack.Screen name="recipe/[id]" options={{ title: "Edit Recipe" }} />
        <Stack.Screen name="recipe/new" options={{ title: "New Recipe" }} />
      </Stack>
    </RecipesProvider>
  );
}
