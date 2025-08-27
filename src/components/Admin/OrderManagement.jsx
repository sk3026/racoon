import React, { useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", total: 100, status: "Shipped" },
    { id: 2, customer: "Jane Smith", total: 200, status: "Pending" },
    { id: 3, customer: "Bob Johnson", total: 150, status: "Processing" },
  ]);

  const changeStatus = (id, status) => {
    setOrders(orders.map(o => (o.id === id ? { ...o, status } : o)));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Management</h2>

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
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">#{order.id}</td>
              <td className="p-3 border-b">{order.customer}</td>
              <td className="p-3 border-b font-medium">${order.total}</td>
              <td className="p-3 border-b">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="p-3 border-b">
                <select
                  value={order.status}
                  onChange={(e) => changeStatus(order.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
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
