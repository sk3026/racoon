import { useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContent = () => {
  const [cartProducts, setCartProducts] = useState([
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "T-shirt",
      size: "M",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "M",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=3",
    },
  ]);

  // Remove product
  const removeItem = (id) => {
    setCartProducts(cartProducts.filter((product) => product.productId !== id));
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.productId === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Decrease quantity (min 1)
  const decreaseQty = (id) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.productId === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <div>
      {cartProducts.map((product) => (
        <div
          key={product.productId}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => decreaseQty(product.productId)}
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() => increaseQty(product.productId)}
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              ${(product.price * product.quantity).toLocaleString()}
            </p>
            <button onClick={() => removeItem(product.productId)}>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600 hover:text-red-800 transition" />
            </button>
          </div>
        </div>
      ))}

      {cartProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartContent;
