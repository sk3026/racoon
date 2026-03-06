import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cartdrawer = ({ drawerOpen, toggleCartDrawer }) => {

  const navigate = useNavigate();

  /* AUTH STATE */

  const { user, guestId } = useSelector((state) => state.auth);

  /* CART ITEMS FROM REDUX */

  const items = useSelector((state) => state.cart.items);

  const userId = user ? user.id : null;

  const handleCheckout = () => {

    toggleCartDrawer();

    if (userId) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=checkout");
    }

  };

  return (

    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col z-[9999] ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >

      {/* CLOSE BUTTON */}

      <div className="flex justify-end p-4 border-b">

        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>

      </div>

      {/* CART CONTENT */}

      <div className="flex-grow p-4 overflow-auto">

        <h2 className="text-xl font-semibold mb-4">
          Your Cart
        </h2>

        {items?.length > 0 ? (

          <CartContent
            items={items}
            userId={userId}
            guestId={guestId}
          />

        ) : (

          <p className="text-gray-600 text-center mt-6">
            Your cart is empty.
          </p>

        )}

      </div>

      {/* CHECKOUT BUTTON */}

      {items?.length > 0 && (

        <div className="p-4 bg-white sticky bottom-0 border-t">

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Checkout
          </button>

          <p className="text-sm tracking-tight text-gray-500 mt-2 text-center">
            Shipping, taxes, and discounts calculated at checkout
          </p>

        </div>

      )}

    </div>

  );

};

export default Cartdrawer;