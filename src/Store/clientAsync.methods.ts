import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientService } from "./Services/client.service";
import { handleApiError } from "../utils";

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      return await clientService.getAll();
    } catch (error) {
      rejectWithValue(handleApiError(error));
      throw error;
    }
  }
);

export const fetchClientByName = createAsyncThunk(
  "clients/fetchClientByName",
  async (fullname: string, { rejectWithValue }) => {
    try {
      return await clientService.getOne(fullname);
    } catch (error) {
      rejectWithValue(handleApiError(error));
      throw error
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (body: any, { rejectWithValue }) => {
    try {
      return await clientService.update(body);
    } catch (error) {
      rejectWithValue(handleApiError(error));
      throw error
    }
  }
);
