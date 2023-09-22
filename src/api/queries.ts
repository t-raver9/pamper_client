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

export interface SubCategoryDTO {
  id: number;
  name: string;
}

export interface CategoryDTO {
  id: number;
  name: string;
  subCategories: SubCategoryDTO[];
}

export type ServiceDTO = {
  id: number;
  description: string;
  price: number;
  duration: number;
  venueId: string;
  categoryId: number;
  subCategoryId: number;
};

export type PaginatedServicesDTO = {
  services: ServiceDTO[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  nextPage?: number | null;
  previousPage?: number | null;
};

export type MutateServiceDTO = Omit<ServiceDTO, "id">;

export type PaginationBase = {
  page?: string | null;
  limit?: string | null;
};

export type ListServicesQuery = PaginationBase & {
  categoryId?: string | null;
  subCategoryId?: string | null;
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

export const getCategories = async (): Promise<CategoryDTO[]> => {
  try {
    const response: AxiosResponse<CategoryDTO[], any> = await axios.get(
      `${serverUrl}/categories/`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting categories: ", error);
    throw error;
  }
};

export const createService = async (
  mutateServiceDTO: MutateServiceDTO
): Promise<ServiceDTO> => {
  try {
    // Make a POST request to create a new service
    const response: AxiosResponse<ServiceDTO, any> = await axios.post(
      `${serverUrl}/venues/${mutateServiceDTO.venueId}/services`,
      mutateServiceDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error creating service: ", error);
    throw error;
  }
};

export const listServicesForVenue = async (
  venueId: string
): Promise<ServiceDTO[]> => {
  try {
    const response: AxiosResponse<ServiceDTO[], any> = await axios.get(
      `${serverUrl}/venues/${venueId}/services`
    );
    return response.data;
  } catch (error) {
    console.error("Error listing services: ", error);
    throw error;
  }
};

export const deleteService = async (venueId: string, serviceId: number) => {
  try {
    await axios.delete(`${serverUrl}/venues/${venueId}/services/${serviceId}`);
  } catch (error) {
    console.error("Error deleting service: ", error);
    throw error;
  }
};

export const listServices = async (body: ListServicesQuery) => {
  try {
    const response = await axios.get(`${serverUrl}/services`, {
      params: body, // This might not work; trying to add query params to request
    });
    return response.data;
  } catch (error) {
    console.error("Error listing services: ", error);
    throw error;
  }
};
