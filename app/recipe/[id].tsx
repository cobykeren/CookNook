// app/recipe/[id].tsx
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Appbar, Button, Title } from "react-native-paper";
import { useRecipes } from "../context/RecipesContext";
import { Rating, AirbnbRating } from "react-native-ratings";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const RecipeScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  // const { recipes, setRecipes } = useRecipes();
  // const recipe = recipes.find((r) => r.id === id);

  // const [title, setTitle] = useState(recipe?.title || "");
  // const [body, setBody] = useState(recipe?.body || "");
  // const [rating, setRating] = useState(recipe?.rating || 0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const user = auth.currentUser;
      if (user && id) {
        const recipeDocRef = doc(
          db,
          "users",
          user.uid,
          "recipes",
          id as string
        );
        const recipeDoc = await getDoc(recipeDocRef);

        if (recipeDoc.exists()) {
          const recipeData = recipeDoc.data();
          setTitle(recipeData.title);
          setBody(recipeData.body);
          setRating(recipeData.rating);
        } else {
          console.error("No such document!");
        }
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // const handleSave = () => {
  //   const updatedRecipes = recipes.map((r) =>
  //     r.id === id ? { ...r, title, body, rating } : r
  //   );
  //   setRecipes(updatedRecipes);
  //   router.back();
  // };

  // const handleDelete = () => {
  //   Alert.alert(
  //     "Delete Recipe",
  //     "Are you sure you want to delete this recipe?",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Deletion cancelled"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "Delete",
  //         onPress: () => {
  //           const updatedRecipes = recipes.filter((r) => r.id !== id);
  //           setRecipes(updatedRecipes);
  //           router.back();
  //         },
  //         style: "destructive",
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user && id) {
        const recipeDocRef = doc(
          db,
          "users",
          user.uid,
          "recipes",
          id as string
        );
        await updateDoc(recipeDocRef, {
          title,
          body,
          rating,
        });
      }
      router.back();
    } catch (error) {
      console.error("Error updating recipe: ", error);
      Alert.alert("Error", "There was an issue updating the recipe.");
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user && id) {
                const recipeDocRef = doc(
                  db,
                  "users",
                  user.uid,
                  "recipes",
                  id as string
                );
                await deleteDoc(recipeDocRef);
                router.back();
              }
            } catch (error) {
              console.error("Error deleting recipe: ", error);
              Alert.alert("Error", "There was an issue deleting the recipe.");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleDone = () => {
    Keyboard.dismiss();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#787878" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.content}>
          <Title style={styles.title}>My Recipe ✏️</Title>
          <TextInput
            style={styles.input}
            placeholder="Recipe Title"
            placeholderTextColor="#C0C0C0"
            value={title}
            onChangeText={setTitle}
            returnKeyType="done"
            onSubmitEditing={handleDone}
          />
          <TextInput
            style={[styles.input, styles.bodyInput]}
            placeholder="Recipe Body"
            placeholderTextColor="#C0C0C0"
            value={body}
            onChangeText={setBody}
            multiline
          />
          <Title style={styles.ratingLabel}>Rating:</Title>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={rating}
            size={30}
            onFinishRating={setRating}
            starContainerStyle={styles.rating}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.saveButton}
              mode="contained"
              onPress={handleSave}
            >
              Save Recipe
            </Button>
            <Button
              style={styles.saveButton}
              mode="contained"
              onPress={handleDelete}
              buttonColor="#FF4F59"
            >
              Delete Recipe
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 24,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  bodyInput: {
    height: 200,
    textAlignVertical: "top",
  },
  rating: {
    alignSelf: "center",
    marginBottom: 16,
  },
  ratingLabel: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 18,
  },
  saveButton: {
    marginTop: 20,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecipeScreen;
