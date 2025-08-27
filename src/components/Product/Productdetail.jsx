import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish jacket for occasions",
  brand: "Fashion Brand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["red", "blue", "black"],
  images: [
    { url: "https://picsum.photos/500/500?random=1", altText: "Stylish jacket 1" },
    { url: "https://picsum.photos/500/500?random=2", altText: "Stylish jacket 2" },
  ]
};

const similarProducts = [
  { _id: 1, name: "Casual Hoodie", price: 100, images: [{ url: "https://picsum.photos/300?random=11" }] },
  { _id: 2, name: "Classic Denim Jacket", price: 120, images: [{ url: "https://picsum.photos/300?random=12" }] },
  { _id: 3, name: "Graphic T-Shirt", price: 50, images: [{ url: "https://picsum.photos/300?random=13" }] },
  { _id: 4, name: "Running Sneakers", price: 80, images: [{ url: "https://picsum.photos/300?random=14" }] },
];

const womensWearProducts = [
  { _id: 5, name: "Floral Dress", price: 90, images: [{ url: "https://picsum.photos/300?random=15" }] },
  { _id: 6, name: "Summer Top", price: 45, images: [{ url: "https://picsum.photos/300?random=16" }] },
  { _id: 7, name: "Skirt", price: 60, images: [{ url: "https://picsum.photos/300?random=17" }] },
  { _id: 8, name: "Heels", price: 110, images: [{ url: "https://picsum.photos/300?random=18" }] },
];

const MAX_QUANTITY = 10;

const Productdetail = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setMainImage(selectedProduct?.images?.[0]?.url || "/placeholder.png");
  }, []);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error(`Please select ${!selectedColor ? "color" : "size"}`, { duration: 1500 });
      return;
    }

    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart", { duration: 1500 });
      setIsButtonDisabled(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 w-20">
            {selectedProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.altText || `Thumbnail ${idx}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === img.url ? "border-blue-500" : "border-gray-300"}`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt={selectedProduct.images[0]?.altText || "Main product"}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 sticky top-20 space-y-4">
            <h1 className="text-2xl font-bold">{selectedProduct.name}</h1>
            <p className="text-gray-700">{selectedProduct.description}</p>
            <p className="text-lg font-semibold">
              ₹{selectedProduct.price}{" "}
              <span className="line-through text-gray-500 text-sm">
                ₹{selectedProduct.originalPrice}
              </span>
            </p>

            {/* Colors */}
            <div>
              <h3 className="font-medium">Colors:</h3>
              <div className="flex space-x-3 mt-2">
                {selectedProduct.colors.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border cursor-pointer relative"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {selectedColor && <p className="text-sm mt-1">Selected Color: {selectedColor}</p>}
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-medium">Sizes:</h3>
              <div className="flex space-x-2 mt-2 overflow-x-auto pb-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && <p className="text-sm mt-1">Selected Size: {selectedSize}</p>}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium">Quantity:</h3>
              <div className="flex items-center space-x-3 mt-2">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 border rounded"
                >-</button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(prev + 1, MAX_QUANTITY))}
                  className="px-3 py-1 border rounded"
                >+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`mt-4 px-6 py-2 rounded text-white transition ${
                isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* You may also like */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">You may also Like</h2>
          <ProductGrid products={similarProducts} />
        </div>

        {/* Women's wear */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">Women's wear</h2>
          <ProductGrid products={womensWearProducts} />
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
