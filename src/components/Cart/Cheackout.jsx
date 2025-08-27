import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const cart = {
  product: [
    { productId: 1, name: "T-shirt", size: "M", quantity: 1, price: 15, color: "Black", image: "https://picsum.photos/200?random=1" },
    { productId: 2, name: "T-shirt", size: "M", quantity: 2, price: 15, color: "Blue", image: "https://picsum.photos/200?random=2" },
    { productId: 3, name: "T-shirt", size: "M", quantity: 1, price: 15, color: "Red", image: "https://picsum.photos/200?random=3" },
  ],
};

// dynamically calculate total
const totalprice = cart.product.reduce((sum, item) => sum + item.price * item.quantity, 0);

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment
  const [shippingAddress, setShippingAddress] = useState({
    firstname: "", lastname: "", address: "", city: "", postalCode: "", country: "", phone: "",
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep(2); // move to payment step
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful:", details);
    navigate("/order-confirmation"); // redirect after successful payment
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
      {/* Left: Checkout form */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        {checkoutStep === 1 ? (
          <form onSubmit={handleShippingSubmit}>
            <h3 className="text-xl mb-4">Shipping Details</h3>

            {/* First + Last Name */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={shippingAddress.firstname}
                onChange={(e) => setShippingAddress({ ...shippingAddress, firstname: e.target.value })}
                placeholder="First Name"
                className="flex-1 p-2 border rounded"
                required
              />
              <input
                type="text"
                value={shippingAddress.lastname}
                onChange={(e) => setShippingAddress({ ...shippingAddress, lastname: e.target.value })}
                placeholder="Last Name"
                className="flex-1 p-2 border rounded"
                required
              />
            </div>

            {/* Address */}
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              placeholder="Address"
              className="w-full mb-4 p-2 border rounded"
              required
            />

            {/* City + Postal Code */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                placeholder="City"
                className="flex-1 p-2 border rounded"
                required
              />
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                placeholder="Postal Code"
                className="flex-1 p-2 border rounded"
                required
              />
            </div>

            {/* Country + Phone */}
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              placeholder="Country"
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
              placeholder="Phone"
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg">
              Continue to Payment
            </button>
          </form>
        ) : (
          <div>
            <h3 className="text-xl mb-4">Pay with PayPal</h3>
            <PayPalButton
              amount={totalprice}
              onSuccess={handlePaymentSuccess}
              onError={() => alert("Payment failed. Try again")}
            />
          </div>
        )}
      </div>

      {/* Right: Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="space-y-4 mb-4">
          {cart.product.map((product) => (
            <div key={product.productId} className="flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded" />
              <div>
                <p>{product.name}</p>
                <p className="text-gray-600">Size: {product.size}</p>
                <p className="text-gray-600">Color: {product.color}</p>
                <p className="text-gray-600">Qty: {product.quantity}</p>
                <p className="text-gray-600 font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${totalprice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
