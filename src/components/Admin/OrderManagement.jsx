import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminOrders,
  updateOrderStatus,
} from "../../redux/slices/adminorderslice";

const OrderManagement = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector(
    (state) => state.adminOrders
  );

  useEffect(() => {

    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAdminOrders());
    }

  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {

    dispatch(
      updateOrderStatus({
        id: orderId,
        status,
      })
    );

  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  const getStatusStyle = (status) => {

    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";

      case "Processing":
        return "bg-blue-100 text-blue-800";

      case "Shipped":
        return "bg-green-100 text-green-800";

      case "Delivered":
        return "bg-purple-100 text-purple-800";

      default:
        return "bg-gray-100 text-gray-800";
    }

  };

  return (

    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Order Management
      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-50">
            <th className="text-left p-3 border-b">ID</th>
            <th className="text-left p-3 border-b">Customer</th>
            <th className="text-left p-3 border-b">Total</th>
            <th className="text-left p-3 border-b">Status</th>
            <th className="text-left p-3 border-b">Change Status</th>
          </tr>

        </thead>

        <tbody>

          {orders?.map((order) => (

            <tr key={order._id} className="hover:bg-gray-50">

              <td className="p-3 border-b">
                #{order._id.slice(-6)}
              </td>

              <td className="p-3 border-b">
                {order.user?.name || "Guest"}
              </td>

              <td className="p-3 border-b font-medium">
                ₹{order.totalPrice}
              </td>

              <td className="p-3 border-b">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

              </td>

              <td className="p-3 border-b">

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >

                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default OrderManagement;