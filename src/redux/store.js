import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authslice";
import productsReducer from "./slices/productslice";
import cartReducer from "./slices/cartslice";
import checkoutReducer from "./slices/checkoutslice";
import orderReducer from "./slices/orderslice";
import adminReducer from "./slices/adminslice"; 
import adminProductsReducer from "./slices/adminproductslice";
import adminOrderReducer from "./slices/adminorderslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrderReducer,
  },

  // DevTools enabled automatically in development
  devTools: import.meta.env.MODE !== "production",
});

export default store;
