// src/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state of the auth slice
interface AuthState {
  isAuthenticated: boolean;
  user: object | null;
  isSideBarOpen: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
  isSideBarOpen: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Optionally save user to localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('userInfo'); // Optionally clear user data from localStorage
    },
    setOpenSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen; // Toggle the sidebar state
    },
  },
});

// Export actions and reducer
export const { setCredential, logout, setOpenSideBar } = authSlice.actions;
export default authSlice.reducer;
