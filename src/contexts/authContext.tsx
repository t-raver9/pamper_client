import { ReactNode, createContext, useContext, useState } from "react";
import {
  BusinessRole,
  RetailRole,
  Role,
  UserDTO,
  VenueDTO,
} from "../api/queries";

type AuthContextType = {
  user: UserDTO | null;
  venue: VenueDTO | null;
  login: (user: UserDTO, venue?: VenueDTO) => void;
  logout: () => void;
  getFormattedRole: () => string | null;
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

  const initialVenueString = localStorage.getItem("venue");
  const initialVenue = initialVenueString
    ? JSON.parse(initialVenueString)
    : null;

  const [user, setUser] = useState<UserDTO | null>(initialUser);
  const [venue, setVenue] = useState<VenueDTO | null>(initialVenue);

  const login = (user: UserDTO, venue?: VenueDTO) => {
    localStorage.setItem("user", JSON.stringify(user));
    if (venue) {
      localStorage.setItem("venue", JSON.stringify(venue));
    }
    setUser(user);
    if (venue) {
      setVenue(venue);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("venue");
    setUser(null);
    setVenue(null);
  };

  const getFormattedRole = () => {
    if (!user || !user.role) {
      return null;
    }

    switch (user.role) {
      case "PROVIDER_ADMIN":
        return "Provider Admin";
      case "VENUE_ADMIN":
        return "Venue Admin";
      case "SOLE_TRADER":
        return "Sole Trader";
      case "STAFF":
        return "Staff";
      case "CUSTOMER":
        return "Customer";
      default:
        return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, venue, login, logout, getFormattedRole }}
    >
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
