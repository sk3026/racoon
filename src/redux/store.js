import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authslice";
import productsReducer from "./slices/productslice";
import cartReducer from "./slices/cartslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },

  // DevTools enabled automatically in development
  devTools: import.meta.env.MODE !== "production",
});

export default store;
