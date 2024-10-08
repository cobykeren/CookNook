// app/LibraryScreen.tsx
import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FAB, Card, Title, Paragraph } from "react-native-paper";
import { useRouter } from "expo-router";
import { AirbnbRating } from "react-native-ratings";
import { useFetchAllRecipes } from "./dataFetch/FetchRecipes";

const LibraryScreen: React.FC = () => {
  const { recipes, loading } = useFetchAllRecipes();
  const router = useRouter();

  const transformedRecipes = recipes.map((recipe) => ({
    ...recipe,
    dateCreated: recipe.dateCreated
      ? recipe.dateCreated.toDate().toLocaleDateString()
      : "Loading...",
  }));

  const renderItem = ({
    item,
  }: {
    item: { id: string; title: string; rating: number; dateCreated: string };
  }) => (
    <TouchableOpacity onPress={() => router.push(`/recipe/${item.id}`)}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.titleRow}>
            <Title style={styles.title}>{item.title}</Title>
            <Paragraph style={styles.date}>{item.dateCreated}</Paragraph>
          </View>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={item.rating}
            isDisabled={true}
            size={20}
            starContainerStyle={styles.rating}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#787878" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transformedRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <FAB
        style={styles.fab}
        label="New Recipe 🍳"
        onPress={() => router.push("/recipe/NewRecipe")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  card: {
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row", // Layout children in a row
    justifyContent: "space-between", // Spread out the title and date
    alignItems: "center", // Center them vertically
    marginBottom: 8,
  },
  title: {
    textAlign: "left",
  },
  date: {
    textAlign: "right", // Right-align the date text
    color: "#666", // Use a lighter color for the date
  },
  fab: {
    width: 180,
    height: 60,
    margin: 5,
    right: 0,
    bottom: 0,
    alignSelf: "center",
  },
  rating: {
    paddingVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LibraryScreen;
