import { CarsBrands } from "../utils";
import { Client, Jobs } from "./types";

export interface UpdateJob {
  licence: string;
  jobId: string;
  body: UpdateJobBody;
}

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
  brand: CarsBrands | string | null;
  model: string;
  year: number | "";
  owner: Omit<Client, "id" | "cars">;
  jobs?: Jobs[];
  kilometers: number | "";
}
