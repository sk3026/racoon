import { useDispatch } from "react-redux";
import { RiDeleteBin3Line } from "react-icons/ri";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const CartContent = ({ items, userId, guestId }) => {

  const dispatch = useDispatch();

  /* HANDLE QUANTITY CHANGE */

  const handleToCart = (productId, delta, quantity, size, color) => {

    const newQty = quantity + delta;

    if (newQty >= 1) {

      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQty,
          size,
          color,
          userId,
          guestId,
        })
      );

    }

  };

  /* REMOVE ITEM */

  const handleRemoveFromCart = (productId, size, color) => {

    dispatch(
      removeFromCart({
        productId,
        userId,
        guestId,
        size,
        color,
      })
    );

  };

  /* EMPTY CART */

  if (!items || items.length === 0) {

    return (
      <p className="text-center text-gray-500 mt-6">
        Your cart is empty.
      </p>
    );

  }

  return (

    <div>

      {items.map((product) => (

        <div
          key={`${product.productId}-${product.size}-${product.color}`}
          className="flex items-start justify-between py-4 border-b"
        >

          {/* PRODUCT INFO */}

          <div className="flex items-start">

            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />

            <div>

              <h3 className="font-semibold">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500">
                Size: {product.size}
              </p>

              <p className="text-sm text-gray-500">
                Color: {product.color}
              </p>

              {/* QUANTITY CONTROLS */}

              <div className="flex items-center mt-2">

                <button
                  onClick={() =>
                    handleToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-lg"
                >
                  -
                </button>

                <span className="mx-4 font-medium">
                  {product.quantity}
                </span>

                <button
                  onClick={() =>
                    handleToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-lg"
                >
                  +
                </button>

              </div>

            </div>

          </div>

          {/* PRICE + DELETE */}

          <div className="text-right">

            <p className="font-semibold">
              ${(product.price * product.quantity).toLocaleString()}
            </p>

            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600 hover:text-red-800 transition" />
            </button>

          </div>

        </div>

      ))}

    </div>

  );

};

export default CartContent;