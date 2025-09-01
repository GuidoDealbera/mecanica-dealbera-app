import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientService } from "./Services/client.service";
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      return await clientService.getAll();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchClientByName = createAsyncThunk(
  "clients/fetchClientByName",
  async (fullname: string, { rejectWithValue }) => {
    try {
      return await clientService.getOne(fullname);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (body: any, { rejectWithValue }) => {
    try {
      return await clientService.update(body);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
