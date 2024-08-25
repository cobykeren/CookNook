// app/recipe/[id].tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Appbar, Button, Title } from "react-native-paper";
import { useRecipes } from "../context/RecipesContext";
import { Rating, AirbnbRating } from "react-native-ratings";

const RecipeScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { recipes, setRecipes } = useRecipes();
  const recipe = recipes.find((r) => r.id === id);

  const [title, setTitle] = useState(recipe?.title || "");
  const [body, setBody] = useState(recipe?.body || "");
  const [rating, setRating] = useState(recipe?.rating || 0);

  const handleSave = () => {
    const updatedRecipes = recipes.map((r) =>
      r.id === id ? { ...r, title, body, rating } : r
    );
    setRecipes(updatedRecipes);
    router.back();
  };

  const handleDelete = () => {
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
          onPress: () => {
            const updatedRecipes = recipes.filter((r) => r.id !== id);
            setRecipes(updatedRecipes);
            router.back();
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.content}>
          <Title style={styles.title}>Edit Recipe ✏️</Title>
          <TextInput
            style={styles.input}
            placeholder="Recipe Title"
            value={title}
            onChangeText={setTitle}
            returnKeyType="done"
            onSubmitEditing={handleDone}
          />
          <TextInput
            style={[styles.input, styles.bodyInput]}
            placeholder="Recipe Body"
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
});

export default RecipeScreen;
