import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info and token from local storage if available
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const tokenFromStorage = localStorage.getItem("token") || null;

// Check for an existing guest ID in the local storage, if not found, generate a new one  
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userInfoFromStorage,
  token: tokenFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser", // Fixed: Changed to unique name
  async (userData, { rejectWithValue }) => { // Removed unnecessary destructuring
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`, 
        userData
      );
      
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // Return both user and token
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// Async thunk for user registration - FIXED NAME
export const registerUser = createAsyncThunk(
  "auth/registerUser", // Changed to unique name
  async (userData, { rejectWithValue }) => { // Removed unnecessary destructuring
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`, 
        userData
      );
      
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // Return both user and token
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.setItem("guestId", state.guestId); // Set new guest ID on logout
    },

    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;