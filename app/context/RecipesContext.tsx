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
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
