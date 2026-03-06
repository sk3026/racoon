import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productslice";

import { addToCart } from "../../redux/slices/cartSlice";

const MAX_QUANTITY = 10;

const ProductDetail = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } =
    useSelector((state) => state.products);

  const { user, guestId } = useSelector((state) => state.auth);

  const productFetchId = productId || id;

  const [mainImage, setMainImage] = useState("/placeholder.png");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  /* FETCH PRODUCT */

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  /* IMAGE HANDLING */

  const productImages =
    selectedProduct?.images?.url?.map((img) => ({
      url: img,
      altText: selectedProduct.images?.altText || "product",
    })) || [];

  useEffect(() => {
    if (productImages.length > 0) {
      setMainImage(productImages[0].url);
    }
  }, [selectedProduct]);

  /* QUANTITY */

  const increaseQty = () =>
    setQuantity((prev) => Math.min(prev + 1, MAX_QUANTITY));

  const decreaseQty = () =>
    setQuantity((prev) => Math.max(prev - 1, 1));

  /* ADD TO CART */

  const handleAddToCart = async () => {
    if (!selectedColor) {
      toast.error("Select a color");
      return;
    }

    if (!selectedSize) {
      toast.error("Select a size");
      return;
    }

    try {
      setIsAdding(true);

      await dispatch(
        addToCart({
          productId: productFetchId,
          quantity,
          size: selectedSize,
          color: selectedColor,
          guestId,
          userId: user?._id,
        })
      ).unwrap();

      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  /* LOADING */

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product...
      </div>
    );

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  if (!selectedProduct)
    return <p className="text-center py-20">Product not found</p>;

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8">

          {/* THUMBNAILS */}
          <div className="hidden md:flex flex-col gap-4">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImage === img.url
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt="Product"
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="md:w-1/2 space-y-5">

            <h1 className="text-2xl font-bold">{selectedProduct.name}</h1>

            <p className="text-gray-600">
              {selectedProduct.description}
            </p>

            <p className="text-lg font-semibold">
              ₹{selectedProduct.price}
            </p>

            {/* COLORS */}
            <div>
              <h3 className="font-medium">Colors</h3>

              <div className="flex gap-3 mt-2">

                {selectedProduct.colors?.map((color) => (

                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all
                      ${
                        selectedColor === color
                          ? "border-black ring-2 ring-black scale-110"
                          : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color }}
                  />

                ))}

              </div>

              {selectedColor && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected: {selectedColor}
                </p>
              )}

            </div>

            {/* SIZES */}
            <div>

              <h3 className="font-medium">Sizes</h3>

              <div className="flex gap-2 mt-2">

                {selectedProduct.size?.map((size) => (

                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded transition
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300"
                      }`}
                  >
                    {size}
                  </button>

                ))}

              </div>

            </div>

            {/* QUANTITY */}
            <div>

              <h3 className="font-medium">Quantity</h3>

              <div className="flex gap-3 mt-2 items-center">

                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={increaseQty}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>

              </div>

            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>

          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-6">
            You may also like
          </h2>

          <ProductGrid products={similarProducts} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;