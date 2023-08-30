import React, { ReactNode, createContext, useContext, useState } from "react";

export type BusinessRole =
  | "PROVIDER_ADMIN"
  | "VENUE_ADMIN"
  | "SOLE_TRADER"
  | "STAFF";

export type RetailRole = "CUSTOMER";

export type Role = BusinessRole | RetailRole;

type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const isBusinessRole = (role: Role): role is BusinessRole => {
  return ["PROVIDER_ADMIN", "VENUE_ADMIN", "SOLE_TRADER", "STAFF"].includes(
    role
  );
};

export const isRetailRole = (role: Role): role is RetailRole => {
  return ["CUSTOMER"].includes(role);
};

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
