import React, { ReactNode, useState, createContext } from "react";

export type ShoppingListContextType = {
    shoppingListItems: {id: number, name: string}[];
    setShoppingListItems: React.Dispatch<React.SetStateAction<{id: number, name: string}[]>>
  };
  
  const defaultShoppingListContext: ShoppingListContextType = {
    shoppingListItems: [],
    setShoppingListItems: () => []
  };

export const ShoppingListContext = createContext(defaultShoppingListContext);

export const ShoppingListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shoppingListItems, setShoppingListItems] = useState<{id: number, name: string}[]>([]);

  return (
    <ShoppingListContext.Provider value={{ shoppingListItems, setShoppingListItems }}>
      {children}
    </ShoppingListContext.Provider>
  );
};