import React, { ReactNode, createContext, useContext, useState } from "react";

type User = {};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialUserString = localStorage.getItem("user");
  const initialUser = initialUserString ? JSON.parse(initialUserString) : null;

  const [user, setUser] = useState<User | null>(initialUser);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
