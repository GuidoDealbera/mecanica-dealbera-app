import { createAsyncThunk } from "@reduxjs/toolkit";
import { carService } from "./Services/car.service";
import { CreateCarBody, UpdateJob } from "../Types/apiTypes";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (_, { rejectWithValue }) => {
    try {
      return await carService.getAll();
    } catch (error) {
      rejectWithValue(error);
      throw error;
    }
  }
);

export const fetchCarByLicence = createAsyncThunk(
  "cars/fetchCarByLicence",
  async (licence: string, { rejectWithValue }) => {
    try {
      return await carService.getByLicence(licence);
    } catch (error) {
      rejectWithValue(error);
      throw error;
    }
  }
);

export const createCar = createAsyncThunk(
  "cars/createCar",
  async (body: CreateCarBody, { rejectWithValue }) => {
    try {
      return await carService.create(body);
    } catch (error) {
      rejectWithValue(error);
      throw error;
    }
  }
);

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async (id: string, { rejectWithValue }) => {
    try {
      return await carService.update(id);
    } catch (error) {
      rejectWithValue(error);
      throw error;
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (_, { rejectWithValue }) => {
    try {
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateJobInCar = createAsyncThunk(
  "cars/updateJobInCar",
  async ({ licence, jobId, body }: UpdateJob, { rejectWithValue }) => {
    try {
      return await carService.updateJob(licence, jobId, body);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
