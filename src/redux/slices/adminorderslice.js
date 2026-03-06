import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
  },
});

/* ================= FETCH ORDERS ================= */

export const fetchAdminOrders = createAsyncThunk(
  "adminOrders/fetchAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, authHeader());
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch orders"
      );
    }
  }
);

/* ================= UPDATE ORDER ================= */

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { status },
        authHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to update order"
      );
    }
  }
);

/* ================= DELETE ORDER ================= */

export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authHeader());
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to delete order"
      );
    }
  }
);

/* ================= SLICE ================= */

const adminOrdersSlice = createSlice({
  name: "adminOrders",

  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH ORDERS */

      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;

        // backend returns { orders, page, pages, totalOrders }

        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;

        state.totalSales = action.payload.orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      })

      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE ORDER */

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      /* DELETE ORDER */

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );

        state.totalOrders = state.orders.length;

        state.totalSales = state.orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      });
  },
});

export default adminOrdersSlice.reducer;