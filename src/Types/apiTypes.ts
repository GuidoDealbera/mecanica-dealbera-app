import type { CarBrand } from "../utils";
import { Client, Jobs } from "./types";

export enum JobStatus {
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  DELIVERED = "delivered",
}

export interface UpdateJobBody {
  status?: JobStatus;
  price?: number;
}

export interface CreateCarBody {
  licensePlate: string;
  brand: CarBrand;
  model: string;
  year: number;
  owner: Omit<Client, "id" | "cars">;
  jobs?: Jobs[];
  kilometers: number;
}

export interface APIResponse {
  status: 'success' | 'failed';
  message: string;
  result?: any;
}

export interface UpdateCar {
  owner?: Partial<Client>;
  jobs?: Partial<Jobs>;
  kilometers?: number;
}

export interface CreateCarJob {
  price: number | "";
  description: string;
  isThirdParty: boolean;
  status: JobStatus;
}
