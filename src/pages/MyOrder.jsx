import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slices/userOrdersSlice";

const MyOrder = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.userOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto p-4 sm:p-6 overflow-x-auto">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        My Orders
      </h2>

      <div className="shadow-md rounded-lg overflow-hidden">

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

            {orders && orders.length > 0 ? (

              orders.map((order) => (

                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >

                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems?.[0]?.image || "/placeholder.png"}
                      alt="product"
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="py-2 px-4 font-medium text-gray-900">
                    #{order._id}
                  </td>

                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <br />
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>

                  <td className="py-2 px-4">
                    {order.shippingAddress?.city}, {order.shippingAddress?.country}
                  </td>

                  <td className="py-2 px-4">
                    {order.orderItems?.length || 0}
                  </td>

                  <td className="py-2 px-4">
                    ${order.totalPrice}
                  </td>

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
                <td colSpan={7} className="py-8 text-center">

                  <p className="text-gray-500 mb-4">
                    You have no orders yet.
                  </p>

                  <Link
                    to="/"
                    className="inline-block bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
                  >
                    Back to Shopping
                  </Link>

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