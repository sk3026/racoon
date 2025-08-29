import { IoMdClose } from "react-icons/io";
import CArtContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate, not Navigate

const Cartdrawer = ({ drawerOpen, toggleCartDrawer, cartItems, removeItem }) => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    navigate("/checkout"); // ✅ this works
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col z-[9999] ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4 border-b">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-grow p-4 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CArtContent cartItems={cartItems} removeItem={removeItem} />
      </div>

      {/* Checkout Section */}
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping, taxes, and discounts calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default Cartdrawer;
