import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authslice";
import productsReducer from "./slices/productslice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutslice";
import userOrdersReducer from "./slices/userOrdersSlice"; 
import adminReducer from "./slices/adminslice";
import adminProductsReducer from "./slices/adminproductslice";
import adminOrderReducer from "./slices/adminorderslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    userOrders: userOrdersReducer,  
    admin: adminReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrderReducer,
  },

  devTools: import.meta.env.MODE !== "production",
});

export default store;