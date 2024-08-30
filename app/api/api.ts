import axios from "axios";

const API_BASE_URL = "https://us-central1-cooknook-b5441.cloudfunctions.net";
export const generateRecipe = async (ingredients: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generateRecipe`, {
      ingredients: ingredients,
    });

    return response.data.recipe.content;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};
