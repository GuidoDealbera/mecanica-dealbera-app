import { CarsBrands } from "../utils";
import { JobStatus } from "./apiTypes";

export interface Client {
  id: string;
  fullname: string;
  phone: string;
  address: string;
  city: string;
  email?: string | null;
  cars?: Car[];
}

export interface Car {
  id: string;
  licensePlate: string;
  model: string;
  brand: CarsBrands;
  year: number;
  jobs: Jobs[];
  kilometers: number;
  owner: Client;
  createdAt: Date;
  updatedAt: Date;
}

export interface Jobs {
  id: string;
  price: number;
  description: string;
  isThirdParty: boolean;
  status: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClientState {
  allClients: Client[];
  client: Client | undefined;
  loadingStates: {
    fetching_all: boolean;
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
  error: Error | null;
}

export interface CarState {
  allCars: Car[];
  car: Car | undefined;
  loadingStates: {
    fetching_all: boolean;
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
  error: Error | null;
}
