import { createSlice } from "@reduxjs/toolkit";
import { ClientState } from "../../Types/types";

const initialState: ClientState = {
  allClients: [],
  client: undefined,
  loadingStates: {
    fetching_all: false,
    creating: false,
    deleting: false,
    fetching: false,
    updating: false,
  },
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    cleanOnwerState: (state) => {
      state.client = undefined;
    },
    cleanOwners: (state) => {
      state.allClients = [];
    },
  },
  extraReducers: (builder) => {
    builder
  }
});
