import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartContent from "../components/Cart/CartContent";

const CartPage = () => {

  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  const userId = user ? user.id : null;

  const handleCheckout = () => {

    if (userId) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=checkout");
    }

  };

  return (

    <div className="max-w-6xl mx-auto py-10 px-6">

      <h1 className="text-2xl font-bold mb-6">
        Your Cart
      </h1>

      {items && items.length > 0 ? (

        <>
          {/* CART ITEMS */}

          <CartContent
            items={items}
            userId={userId}
            guestId={guestId}
          />

          {/* CHECKOUT BUTTON */}

          <div className="flex justify-end mt-6">

            <button
              onClick={handleCheckout}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>

          </div>

        </>

      ) : (

        <p className="text-gray-500">
          Your cart is empty.
        </p>

      )}

    </div>

  );

};

export default CartPage;