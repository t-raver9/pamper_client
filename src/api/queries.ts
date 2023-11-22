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
  Address?: AddressDTO | null;
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

export type AddressDTO = {
  address: string;
  lat: number;
  long: number;
  id?: string | null;
  venueId?: string | null;
};

export enum Day {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export const DAYS: Day[] = [
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
  Day.SUNDAY,
];

export const stringToDay = (day: string): Day => {
  switch (day) {
    case "MONDAY":
      return Day.MONDAY;
    case "TUESDAY":
      return Day.TUESDAY;
    case "WEDNESDAY":
      return Day.WEDNESDAY;
    case "THURSDAY":
      return Day.THURSDAY;
    case "FRIDAY":
      return Day.FRIDAY;
    case "SATURDAY":
      return Day.SATURDAY;
    case "SUNDAY":
      return Day.SUNDAY;
    default:
      throw new Error(`Invalid day: ${day}`);
  }
};

export const stringToDate = (date: string): Date => {
  const [year, month, day] = date.split("-").map((s) => parseInt(s));
  return new Date(year, month - 1, day);
};

export type BusinessHoursDTO = {
  id?: string | null;
  weekday: Day;
  open: string | null;
  close: string | null;
  closed: boolean;
  venueId: string;
};

export type HolidayDaysDTO = {
  id: string;
  date: Date;
  name: string | null;
  venueId: string;
};

export type VenueHoursDTO = {
  businessHours: BusinessHoursDTO[];
  holidayDays: HolidayDaysDTO[];
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

export const getVenueHours = async (venueId: string) => {
  try {
    const response = await axios.get(`${serverUrl}/venues/${venueId}/hours`);
    return response.data;
  } catch (error) {
    console.error("Error listing services: ", error);
    throw error;
  }
};

export const postVenueHours = async (
  venueId: string,
  venueHours: VenueHoursDTO
) => {
  try {
    const response = await axios.post(
      `${serverUrl}/venues/${venueId}/hours`,
      venueHours
    );
    return response.data;
  } catch (error) {
    console.error("Error setting venue hours: ", error);
    throw error;
  }
};

export const getAddressForVenue = async (venueId: string) => {
  try {
    const response = await axios.get(`${serverUrl}/venues/${venueId}/address`);
    return response.data;
  } catch (error) {
    console.error("Error getting venue address: ", error);
    throw error;
  }
};

export const postAddressForVenue = async (
  venueId: string,
  address: AddressDTO
) => {
  try {
    const response = await axios.post(
      `${serverUrl}/venues/${venueId}/address`,
      address
    );
    return response.data;
  } catch (error) {
    console.error("Error setting venue address: ", error);
    throw error;
  }
};

type Bounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export const listVenuesInBounds = async (bounds: Bounds) => {
  try {
    const response = await axios.get(`${serverUrl}/venues/in-bounds`, {
      params: bounds,
    });
    return response.data as VenueDTO[];
  } catch (error) {
    console.error("Error listing venues: ", error);
    throw error;
  }
};
