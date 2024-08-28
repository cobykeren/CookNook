import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Use your server's URL in production

export const generateRecipe = async (ingredients: string) => {
  void ingredients; // Remove this line when you implement the function
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-recipe`, {
      ingredients: ingredients,
    });

    return response.data.recipe.content; // Return the generated recipe
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};
