import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "sonner";

import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Collectionpage from "./pages/Collectionpage";
import Productdetail from "./components/Product/Productdetail";
import Cheackout from "./components/Cart/Cheackout";
import OrderConfirmationpage from "./pages/OrderConfirmationpage";
import OrderDetailPage from "./pages/OrderDetailPage";
import MyOrder from "./pages/MyOrder";
import AboutPage from "./pages/Aboutpage";
import CartPage from "./pages/CartPage";

import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomepage from "./pages/AdminHomepage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import ProtectedRoute from "./components/Common/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          {/* ================= USER ROUTES ================= */}

          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="collection/:collection" element={<Collectionpage />} />
            <Route path="product/:id" element={<Productdetail />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="about" element={<AboutPage />} />

            {/* Protected user routes */}

            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <Cheackout />
                </ProtectedRoute>
              }
            />

            <Route
              path="my-orders"
              element={
                <ProtectedRoute>
                  <MyOrder />
                </ProtectedRoute>
              }
            />

            <Route
              path="order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="order-confirmation/:id"
              element={
                <ProtectedRoute>
                  <OrderConfirmationpage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ================= ADMIN ROUTES ================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomepage />} />

            <Route path="users" element={<UserManagement />} />

            <Route path="product" element={<ProductManagement />} />

            <Route path="product/:id" element={<EditProductPage />} />

            <Route path="product/:id/edit" element={<EditProductPage />} />

            <Route path="order" element={<OrderManagement />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;