import React, { ReactNode, useState, createContext } from "react";
import Recipe from "../../models/recipe";

export type RecipesContextType = {
    recipes: Recipe[];
    isLoadingRecipes: boolean;
    setIsLoadingRecipes: React.Dispatch<React.SetStateAction<boolean>>,
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  };
  
  const defaultRecipesContext: RecipesContextType = {
    recipes: [],
    isLoadingRecipes: false,
    setIsLoadingRecipes: () => {},
    setRecipes: () => {}, 
  };

export const RecipesContext = createContext(defaultRecipesContext);

export const RecipesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState<boolean>(false);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, isLoadingRecipes, setIsLoadingRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};
