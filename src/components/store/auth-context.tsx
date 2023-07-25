import React, { ReactNode, useState, createContext } from "react";

export type AuthContextType = {
    loggedUser: string;
    setLoggedUser: React.Dispatch<React.SetStateAction<string>>
  };
  
  const defaultAuthContext: AuthContextType = {
    loggedUser: '',
    setLoggedUser: () => ''
  };

export const AuthContext = createContext(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<string>('');

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

