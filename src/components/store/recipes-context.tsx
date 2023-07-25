import React, { ReactNode, useState, createContext } from "react";
import Recipe from "../../models/recipe";

export type RecipesContextType = {
    loadedRecipes: Recipe[];
    setLoadedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    userRecipes: Recipe [];
    setUserRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    isLoadingRecipes: boolean;
    setIsLoadingRecipes: React.Dispatch<React.SetStateAction<boolean>>,
  };
  
  const defaultRecipesContext: RecipesContextType = {
    loadedRecipes: [],
    setLoadedRecipes: () => {}, 
    userRecipes: [],
    setUserRecipes: () => {},
    isLoadingRecipes: false,
    setIsLoadingRecipes: () => {},
  };

export const RecipesContext = createContext(defaultRecipesContext);

export const RecipesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loadedRecipes, setLoadedRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState<boolean>(false);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

  return (
    <RecipesContext.Provider value={{ loadedRecipes, setLoadedRecipes, isLoadingRecipes, setIsLoadingRecipes, userRecipes, setUserRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};
