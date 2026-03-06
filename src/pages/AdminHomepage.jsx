import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAdminProducts } from "../redux/slices/adminproductslice";
import { fetchAdminOrders } from "../redux/slices/adminorderslice";

const AdminHomepage = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const stats = [
    { title: "Revenue", value: `$${totalSales || 0}` },
    { title: "Orders", value: totalOrders || 0 },
    { title: "Products", value: products?.length || 0 },
    { title: "Users", value: "—" }, // replace later if you connect users API
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {productsLoading || ordersLoading ? (
        <p>Loading...</p>
      ) : productsError ? (
        <p className="text-red-500">Error loading products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error loading orders: {ordersError}</p>
      ) : (
        <>
          {/* Stats Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            {stats.map((stat, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >

                <h2 className="text-lg font-semibold mb-2">
                  {stat.title}
                </h2>

                <p className="text-2xl font-bold">
                  {stat.value}
                </p>

              </div>

            ))}

          </div>

          {/* Recent Orders */}

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-xl font-semibold mb-4">
              Recent Orders
            </h2>

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>

              </thead>

              <tbody>

                {orders?.slice(0, 5).map((order) => (

                  <tr key={order._id} className="border-b">

                    <td className="p-3">
                      {order._id?.slice(-6)}
                    </td>

                    <td className="p-3">
                      {order.user?.name || "Guest"}
                    </td>

                    <td className="p-3">
                      ${order.totalPrice}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        </>
      )}

    </div>
  );
};

export default AdminHomepage;