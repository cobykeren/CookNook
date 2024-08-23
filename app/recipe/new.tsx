import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Appbar, Button, Title } from "react-native-paper";
import { useRecipes } from "../context/RecipesContext";
import { AirbnbRating } from "react-native-ratings";

const NewRecipeScreen: React.FC = () => {
  const router = useRouter();
  const { recipes, setRecipes } = useRecipes();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);

  const handleSave = () => {
    if (!title || !body || rating === 0) {
      Alert.alert("Error", "Please fill out all fields and provide a rating.");
      return;
    }

    const newRecipe = {
      id: (recipes.length + 1).toString(), // Generate a new ID
      title,
      body,
      rating,
    };

    setRecipes([...recipes, newRecipe]);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Title style={styles.title}>New Recipe 🍳</Title>
        <TextInput
          style={styles.input}
          placeholder="Recipe Title"
          value={title}
          onChangeText={setTitle}
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
        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          Save Recipe
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: "top",
  },
  ratingLabel: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 18,
  },
  rating: {
    alignSelf: "center",
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default NewRecipeScreen;
