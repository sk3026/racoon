import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "sonner";
import Profile from "./pages/Profile";
import Collectionpage from "./pages/Collectionpage";
import Productdetail from "./components/Product/Productdetail";
import Cheackout from "./components/Cart/Cheackout";
import OrderConfirmationpage from "./pages/OrderConfirmationpage";
import OrderDetailPage from "./pages/OrderDetailPage";
import MyOrder from "./pages/MyOrder";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomepage from "./pages/AdminHomepage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* User routes wrapped inside UserLayout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collection/:collection" element={<Collectionpage />} />
          <Route path="product/:id" element={<Productdetail />} />
          <Route path="checkout" element={<Cheackout />} />
          <Route path="order-confirmation" element={<OrderConfirmationpage />} />
          <Route path="order/:id" element={<OrderDetailPage />} />
          <Route path="my-orders" element={<MyOrder />} />
        </Route>

        {/* Admin routes wrapped inside AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomepage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="product" element={<ProductManagement />} />
          <Route path="product/:id" element={<EditProductPage />} />
          <Route path="product/:id/edit" element={<EditProductPage />} />
          <Route path="order" element={<OrderManagement/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;