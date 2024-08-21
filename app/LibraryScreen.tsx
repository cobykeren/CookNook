import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import { Appbar, FAB, Card, Title } from "react-native-paper";

const recipes = [
  { id: "1", title: "Spaghetti Bolognese" },
  { id: "2", title: "Chicken Curry" },
  { id: "3", title: "Vegetable Stir Fry" },
  { id: "4", title: "Spaghetti Bolognese" },
  { id: "5", title: "Chicken Curry" },
  { id: "6", title: "Vegetable Stir Fry" },
  { id: "7", title: "Spaghetti Bolognese" },
  { id: "8", title: "Chicken Curry" },
  { id: "9", title: "Vegetable Stir Fry" },
  { id: "10", title: "Spaghetti Bolognese" },
  { id: "11", title: "Chicken Curry" },
  { id: "12", title: "Vegetable Stir Fry" },
  { id: "13", title: "Spaghetti Bolognese" },
  { id: "14", title: "Chicken Curry" },
];

const LibraryScreen: React.FC = () => {
  const renderItem = React.useCallback(
    ({ item }: { item: { id: string; title: string } }) => (
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.title}</Title>
        </Card.Content>
      </Card>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEventThrottle={16} // Optional: helps smooth out scroll events
        />

        <FAB
          style={styles.fab}
          icon="plus"
          label="New RECIPE"
          onPress={() => console.log("Add new recipe")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Ensure the SafeAreaView has a background color
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingHorizontal: 16,
    flexGrow: 1, // Ensure the list grows to fill available space
  },
  card: {
    marginBottom: 16,
  },
  fab: {
    width: 180,
    height: 60,
    margin: 5,
    right: 0,
    bottom: 0,
    alignSelf: "center",
  },
});

export default LibraryScreen;
