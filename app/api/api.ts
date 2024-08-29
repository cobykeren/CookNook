import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Use your server's URL in production

export const generateRecipe = async (ingredients: string) => {
  try {
    const response = await axios.post(
      `https://us-central1-cooknook-b5441.cloudfunctions.net/generateRecipe`,
      {
        ingredients: ingredients,
      }
    );

    return response.data.recipe.content;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};
