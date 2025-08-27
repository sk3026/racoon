import { Link } from "react-router-dom";

const checkout = {
  _id: "12345",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Black",
      price: 100,
      size: "M",
      quantity: 1,
      image: "https://picsum.photos/200?random=4",
    },
    {
      productId: "2",
      name: "Pant",
      color: "Blue",
      price: 50,
      size: "L",
      quantity: 1,
      image: "https://picsum.photos/200?random=5",
    },
  ],
};

// Function to calculate estimated delivery date
const calculateEstimatedDelivery = (date, days) => {
  const resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() + days);
  return resultDate;
};

const OrderConfirmationPage = () => {
  const estimatedDeliveryDate = calculateEstimatedDelivery(
    checkout.createdAt,
    7
  ); // 7 days for shipping

  const totalPrice = checkout.checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-10">
        🎉 Thank you for your order!
      </h1>

      {/* Order Info */}
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div>
          <h2 className="text-xl font-semibold">Order ID: #{checkout._id}</h2>
          <p className="text-gray-500">
            Order date: {new Date(checkout.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            Estimated delivery: {estimatedDeliveryDate.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-gray-700 border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Product</th>
              <th className="py-3 px-4 border-b text-left">Details</th>
              <th className="py-3 px-4 border-b text-left">Price</th>
              <th className="py-3 px-4 border-b text-left">Quantity</th>
              <th className="py-3 px-4 border-b text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {checkout.checkoutItems.map((item) => (
              <tr key={item.productId} className="border-b">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <span className="font-medium">{item.name}</span>
                </td>
                <td className="py-3 px-4">
                  {item.color}, Size: {item.size}
                </td>
                <td className="py-3 px-4">${item.price}</td>
                <td className="py-3 px-4">{item.quantity}</td>
                <td className="py-3 px-4">${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Total */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-lg font-semibold">Total: ${totalPrice}</div>
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
