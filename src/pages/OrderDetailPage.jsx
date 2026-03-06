import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderDetailPage = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setOrder(res.data);
        setLoading(false);

      } catch (err) {

        setError("Failed to load order");
        setLoading(false);

      }

    };

    fetchOrder();

  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading order...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  const totalPrice = order.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Order Details
      </h1>

      {/* Order Info */}

      <div className="bg-white shadow rounded-lg p-6 mb-6">

        <p className="mb-2">
          <strong>Order ID:</strong> {order._id}
        </p>

        <p className="mb-2">
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>

        <p className="mb-2">
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white text-sm ${
              order.isPaid ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {order.isPaid ? "Paid" : "Unpaid"}
          </span>
        </p>

      </div>

      {/* Shipping Address */}

      <div className="bg-white shadow rounded-lg p-6 mb-6">

        <h2 className="text-lg font-semibold mb-4">
          Shipping Address
        </h2>

        <p>{order.shippingAddress?.address}</p>
        <p>
          {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.postalCode}
        </p>
        <p>{order.shippingAddress?.country}</p>

      </div>

      {/* Items */}

      <div className="bg-white shadow rounded-lg p-6">

        <h2 className="text-lg font-semibold mb-4">
          Order Items
        </h2>

        {order.orderItems.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-4 border-b py-4"
          >

            <img
              src={item.image || "/placeholder.png"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />

            <div className="flex-1">

              <p className="font-medium">
                {item.name}
              </p>

              <p className="text-gray-500">
                {item.color} | Size: {item.size}
              </p>

            </div>

            <div>

              <p>
                ${item.price} × {item.quantity}
              </p>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

            </div>

          </div>

        ))}

        {/* Total */}

        <div className="flex justify-between mt-6 text-lg font-semibold">

          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>

        </div>

      </div>

      {/* Back Button */}

      <div className="mt-6">

        <Link
          to="/my-orders"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ← Back to My Orders
        </Link>

      </div>

    </div>

  );

};

export default OrderDetailPage;