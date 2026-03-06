import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  /* FETCH ORDER FROM BACKEND */

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

        /* CLEAR CART */

        dispatch(clearCart());
        localStorage.removeItem("cart");

      } catch (error) {

        console.error("Error loading order", error);
        navigate("/my-orders");

      }

    };

    fetchOrder();

  }, [id, dispatch, navigate]);

  /* ESTIMATED DELIVERY */

  const calculateEstimatedDelivery = (orderDate, daysToAdd) => {

    const date = new Date(orderDate);
    date.setDate(date.getDate() + daysToAdd);
    return date;

  };

  if (!order) {
    return <p className="text-center mt-10">Loading order...</p>;
  }

  const estimatedDeliveryDate = calculateEstimatedDelivery(
    order.createdAt,
    7
  );

  const totalPrice = order.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">

      <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-10">
        🎉 Thank you for your order!
      </h1>

      <div className="flex flex-col md:flex-row justify-between mb-10">

        <div>

          <h2 className="text-xl font-semibold">
            Order ID: #{order._id}
          </h2>

          <p className="text-gray-500">
            Order date: {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <p className="text-gray-500">
            Estimated delivery: {estimatedDeliveryDate.toLocaleDateString()}
          </p>

        </div>

      </div>

      {/* ITEMS TABLE */}

      <div className="overflow-x-auto mb-6">

        <table className="min-w-full text-gray-700 border rounded-lg">

          <thead className="bg-gray-100">

            <tr>

              <th className="py-3 px-4 border-b text-left">
                Product
              </th>

              <th className="py-3 px-4 border-b text-left">
                Details
              </th>

              <th className="py-3 px-4 border-b text-left">
                Price
              </th>

              <th className="py-3 px-4 border-b text-left">
                Quantity
              </th>

              <th className="py-3 px-4 border-b text-left">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {order.orderItems.map((item, index) => (

              <tr key={index} className="border-b">

                <td className="py-3 px-4 flex items-center gap-3">

                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md"
                  />

                  <span className="font-medium">
                    {item.name}
                  </span>

                </td>

                <td className="py-3 px-4">
                  {item.color}, Size: {item.size}
                </td>

                <td className="py-3 px-4">
                  ${item.price}
                </td>

                <td className="py-3 px-4">
                  {item.quantity}
                </td>

                <td className="py-3 px-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ORDER TOTAL */}

      <div className="flex justify-between items-center mt-6">

        <div className="text-lg font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>

        <Link
          to="/my-orders"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
        >
          ← Back to My Orders
        </Link>

      </div>

    </div>

  );

};

export default OrderConfirmationPage;