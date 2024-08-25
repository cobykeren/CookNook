// app/context/RecipesContext.tsx
import React, { createContext, useContext, useState } from "react";

type Recipe = {
  id: string;
  title: string;
  body: string;
  rating: number;
  dateCreated: string;
};

type RecipesContextType = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      title: "Spaghetti Bolognese",
      body: "Boil pasta, cook meat...",
      rating: 4,
      dateCreated: "8/01/2024",
    },
    {
      id: "2",
      title: "Chicken Curry",
      body: "Cook chicken, add spices...",
      rating: 5,
      dateCreated: "8/01/2024",
    },
  ]);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};
