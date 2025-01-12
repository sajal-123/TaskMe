import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import { apiSlice } from "./Slices/ApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>; // Type for state
export type AppDispatch = typeof store.dispatch; // Type for dispatch
export default store;
