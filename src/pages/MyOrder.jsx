import { useEffect, useState } from "react";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            { name: "Product 1", image: "https://picsum.photos/500/500?random=1" },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "34567",
          createdAt: new Date(),
          shippingAddress: { city: "London", country: "UK" },
          orderItems: [
            { name: "Product 2", image: "https://picsum.photos/500/500?random=2" },
          ],
          totalPrice: 150,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Order Id</th>
              <th className="py-2 px-4">Created</th>
              <th className="py-2 px-4">Shipping Address</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems?.[0]?.image || ""}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 font-medium text-gray-900">
                    #{order._id}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()} <br />
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4">
                    {order.shippingAddress?.city}, {order.shippingAddress?.country}
                  </td>
                  <td className="py-2 px-4">{order.orderItems?.length || 0}</td>
                  <td className="py-2 px-4">${order.totalPrice}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        order.isPaid ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
