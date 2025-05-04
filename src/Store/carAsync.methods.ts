import { createAsyncThunk } from "@reduxjs/toolkit";
import { carService } from "./Services/car.service";
import { CreateCarBody, UpdateJob } from "../Types/apiTypes";
import { handleApiError } from "../utils";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (_, { rejectWithValue }) => {
    try {
      return await carService.getAll();
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchCarByLicence = createAsyncThunk(
  "cars/fetchCarByLicence",
  async (licence: string, { rejectWithValue }) => {
    try {
      return await carService.getByLicence(licence);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createCar = createAsyncThunk(
  "cars/createCar",
  async (body: CreateCarBody, { rejectWithValue }) => {
    try {
      return await carService.create(body);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async (id: string, { rejectWithValue }) => {
    try {
      return await carService.update(id);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (licence: string, { rejectWithValue }) => {
    try {
      return await carService.delete(licence)
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateJobInCar = createAsyncThunk(
  "cars/updateJobInCar",
  async ({ licence, jobId, body }: UpdateJob, { rejectWithValue }) => {
    try {
      return await carService.updateJob(licence, jobId, body);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
