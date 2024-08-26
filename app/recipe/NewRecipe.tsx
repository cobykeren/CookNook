import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { Button, Title } from "react-native-paper";
import { useRecipes } from "../context/RecipesContext";
import { AirbnbRating } from "react-native-ratings";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const NewRecipeScreen: React.FC = () => {
  const router = useRouter();
  const { recipes, setRecipes } = useRecipes();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);

  const handleSave = async () => {
    if (!title || !body || rating === 0) {
      Alert.alert("Error", "Please fill out all fields and provide a rating.");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      const recipesCollectionRef = collection(db, "users", user.uid, "recipes");

      await addDoc(recipesCollectionRef, {
        title,
        body,
        rating,
        dateCreated: serverTimestamp(),
      });

      console.log("Recipe added to Firestore");
    }

    // setRecipes([...recipes, newRecipe]);
    router.back();
  };

  const handleDone = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Title style={styles.title}>New Recipe 🍳</Title>
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
          placeholder="Recipe Instructions"
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
    height: 200,
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
