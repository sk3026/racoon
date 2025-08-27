

const AdminHomepage = () => {
  const orders = [
    { id: 1, customer: "John Doe", total: 100, status: "Pending" },
    { id: 2, customer: "Jane Smith", total: 200, status: "Shipped" },
    { id: 3, customer: "Alice Johnson", total: 150, status: "Delivered" },
  ];

  // Example stats
  const stats = [
    { title: "Revenue", value: "$10,000" },
    { title: "Orders", value: "320" },
    { title: "Users", value: "120" },
    { title: "Products", value: "85" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h2 className="text-lg font-semibold mb-2">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
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
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">${order.total}</td>
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
    </div>
  );
};

export default AdminHomepage;
