// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice'; // Import your auth slice

const store = configureStore({
    reducer: {
        auth: authReducer, // Add the auth slice to the reducer

    },
});

export type RootState = ReturnType<typeof store.getState>; // Type for state
export type AppDispatch = typeof store.dispatch; // Type for dispatch
export default store;
