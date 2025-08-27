import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MyOrder = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: {
        city: "New York",
        country: "USA",
      },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/200?random=1",
        },
        {
          productId: "2",
          name: "Shirt",
          price: 80,
          quantity: 2,
          image: "https://picsum.photos/200?random=2",
        },
      ],
    };

    setOrderDetails(mockOrderDetails);
  }, [id]);

  if (!orderDetails) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p>No order details found</p>
      </div>
    );
  }

  // calculate total
  const totalPrice = orderDetails.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatCurrency = (value) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-sm rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Detail</h2>

      <div className="p-4 sm:p-6 rounded-lg border">
        {/* order header */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Order ID: #{orderDetails._id}
            </h3>
            <p className="text-gray-500">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <span
              className={`${
                orderDetails.isPaid ? "text-green-600" : "text-red-600"
              } px-3 py-1 rounded-full border border-gray-300 text-sm font-medium`}
            >
              {orderDetails.isPaid ? "Approved" : "Pending"}
            </span>
            <span
              className={`${
                orderDetails.isDelivered ? "text-green-600" : "text-red-600"
              } px-3 py-1 rounded-full border border-gray-300 text-sm font-medium`}
            >
              {orderDetails.isDelivered ? "Delivered" : "Pending"}
            </span>
          </div>
        </div>

        {/* payment + shipping info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
            <p>Method: {orderDetails.paymentMethod}</p>
            <p>Status: {orderDetails.isPaid ? "Paid" : "Pending"}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
            <p>
              Address: {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.country}
            </p>
            <p>Method: {orderDetails.shippingMethod}</p>
          </div>
        </div>

        {/* product list */}
        <div className="overflow-x-auto">
          <h4 className="text-lg font-semibold mb-4">Products</h4>
          <table className="min-w-full text-gray-700 mb-4 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Product</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Quantity</th>
                <th className="py-2 px-4 border-b text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((item) => (
                <tr key={item.productId} className="border-b">
                  <td className="py-2 px-4 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <Link
                      to={`/product/${item.productId}`}
                      className="hover:underline text-blue-500"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{formatCurrency(item.price)}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* order total */}
          <div className="flex justify-end font-semibold text-lg">
            Total: {formatCurrency(totalPrice)}
          </div>
        </div>

        {/* navigation links */}
        <div className="flex justify-between mt-6">
          <Link to="/my-orders" className="text-blue-500 hover:underline">
            ← Back to My Orders
          </Link>
          <Link to="/" className="text-emerald-600 hover:underline font-medium">
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
