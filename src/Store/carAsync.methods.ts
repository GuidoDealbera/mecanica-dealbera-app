import { createAsyncThunk } from "@reduxjs/toolkit";
import { carService } from "./Services/car.service";
import { CreateCarBody, CreateCarJob, UpdateJobBody } from "../Types/apiTypes";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (_, { rejectWithValue }) => {
    try {
      return await carService.getAll();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCarByLicence = createAsyncThunk(
  "cars/fetchCarByLicence",
  async (licence: string, { rejectWithValue }) => {
    try {
      return await carService.getByLicence(licence);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createCar = createAsyncThunk(
  "cars/createCar",
  async (body: CreateCarBody, { rejectWithValue }) => {
    try {
      return await carService.create(body);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createJob = createAsyncThunk(
  "cars/createJob",
  async (
    { id, data }: { id: string; data: CreateCarJob },
    { rejectWithValue }
  ) => {
    try {
      return await carService.createJob(id, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (licence: string, { rejectWithValue }) => {
    try {
      return await carService.delete(licence);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateJobInCar = createAsyncThunk(
  "cars/updateJobInCar",
  async (
    {
      licence,
      jobId,
      body,
    }: { licence: string; jobId: string; body: UpdateJobBody },
    { rejectWithValue }
  ) => {
    try {
      return await carService.updateJob(licence, jobId, body);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
