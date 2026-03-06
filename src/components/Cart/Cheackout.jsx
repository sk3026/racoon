import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import PayPalButton from "./PayPalButton";

const Checkout = () => {

  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutStep, setCheckoutStep] = useState(1);

  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  /* Redirect if cart empty */

  useEffect(() => {
    if (!items || items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  /* Update email when user logs in */

  useEffect(() => {
    if (user?.email) {
      setShippingAddress((prev) => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  /* Shipping form submit */

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep(2);
  };

  /* PayPal success */

  const handlePaymentSuccess = async (details) => {

    try {

      const token = localStorage.getItem("token");

      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      /* sanitize items to avoid validation errors */

      const formattedItems = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "/placeholder.png",
        size: item.size,
        color: item.color
      }));

      /* 1️⃣ CREATE CHECKOUT */

      const checkoutRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        {
          checkoutItems: formattedItems,
          shippingAddress,
          paymentMethod: "PayPal",
          totalPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const checkoutId = checkoutRes.data._id;

      /* 2️⃣ MARK PAYMENT COMPLETE */

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "Completed",
          paymentDetails: details
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      /* 3️⃣ FINALIZE ORDER */

      const orderRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      /* Redirect to confirmation page */

      navigate(`/order-confirmation/${orderRes.data._id}`);

    } catch (error) {

      console.error("Checkout error:", error);

    }

  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!items || items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">

      {/* LEFT SIDE */}

      <div className="bg-white rounded-lg p-6">

        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        {checkoutStep === 1 ? (

          <form onSubmit={handleShippingSubmit}>

            <h3 className="text-xl mb-4">Shipping Details</h3>

            <div className="flex gap-4 mb-4">

              <input
                type="text"
                placeholder="First Name"
                value={shippingAddress.firstname}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstname: e.target.value
                  })
                }
                className="flex-1 p-2 border rounded"
                required
              />

              <input
                type="text"
                placeholder="Last Name"
                value={shippingAddress.lastname}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastname: e.target.value
                  })
                }
                className="flex-1 p-2 border rounded"
                required
              />

            </div>

            <input
              type="email"
              value={shippingAddress.email}
              readOnly
              className="w-full mb-4 p-2 border rounded bg-gray-100"
            />

            <input
              type="text"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value
                })
              }
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <div className="flex gap-4 mb-4">

              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value
                  })
                }
                className="flex-1 p-2 border rounded"
                required
              />

              <input
                type="text"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value
                  })
                }
                className="flex-1 p-2 border rounded"
                required
              />

            </div>

            <input
              type="text"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value
                })
              }
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <input
              type="text"
              placeholder="Phone"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value
                })
              }
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Continue to Payment
            </button>

          </form>

        ) : (

          <div>

            <h3 className="text-xl mb-4">Pay with PayPal</h3>

            <PayPalButton
              amount={totalPrice}
              onSuccess={handlePaymentSuccess}
            />

          </div>

        )}

      </div>

      {/* RIGHT SIDE */}

      <div className="bg-gray-50 p-6 rounded-lg">

        <h3 className="text-lg mb-4">Order Summary</h3>

        {items.map((product, index) => (

          <div key={index} className="flex gap-4 mb-4">

            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="w-20 h-24 object-cover rounded"
            />

            <div>

              <p>{product.name}</p>

              <p className="text-gray-600">
                Qty: {product.quantity}
              </p>

              <p className="font-semibold">
                ${(product.price * product.quantity).toFixed(2)}
              </p>

            </div>

          </div>

        ))}

        <div className="flex justify-between text-lg font-semibold mt-6">

          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>

        </div>

      </div>

    </div>

  );

};

export default Checkout;