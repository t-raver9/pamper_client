import axios, { AxiosResponse } from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export type BusinessRole =
  | "PROVIDER_ADMIN"
  | "VENUE_ADMIN"
  | "SOLE_TRADER"
  | "STAFF";

export type RetailRole = "CUSTOMER";

export type Role = BusinessRole | RetailRole;

export type UserDTO = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  facebookId?: string;
  googleId?: string;
  role: Role;
};

export type VenueDTO = {
  id: string;
  businessName: string;
  isSoleTrader: boolean;
};

export type UserVenueDTO = {
  user: UserDTO;
  venue?: VenueDTO;
};

export const getCurrentUser = async (): Promise<UserVenueDTO> => {
  try {
    const response: AxiosResponse<UserVenueDTO, any> = await axios.get(
      `${serverUrl}/users/current/?role=CUSTOMER`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting current user: ", error);
    throw error;
  }
};
