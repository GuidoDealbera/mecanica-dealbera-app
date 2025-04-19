import { configureStore } from "@reduxjs/toolkit";
import CarsReducer from './Slices/carSlice';

export const store = configureStore({
    reducer: {
        cars: CarsReducer
    },
    devTools: !import.meta.env.PROD
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch