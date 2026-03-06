import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/products`;

const authHeader = () => {
  const token = localStorage.getItem("usertoken");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

/* ================= FETCH PRODUCTS ================= */

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, authHeader());

      // backend usually returns array
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch products"
      );
    }
  }
);

/* ================= ADD PRODUCT ================= */

export const addAdminProduct = createAsyncThunk(
  "adminProducts/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        productData,
        authHeader()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to add product"
      );
    }
  }
);

/* ================= UPDATE PRODUCT ================= */

export const updateAdminProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        productData,
        authHeader()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to update product"
      );
    }
  }
);

/* ================= DELETE PRODUCT ================= */

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authHeader());

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to delete product"
      );
    }
  }
);

/* ================= SLICE ================= */

const adminProductSlice = createSlice({
  name: "adminProducts",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH */

      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;

        // support both formats
        state.products = action.payload.products || action.payload;
      })

      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */

      .addCase(addAdminProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      .addCase(addAdminProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* UPDATE */

      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      .addCase(updateAdminProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* DELETE */

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;