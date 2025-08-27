import React from "react";

const ProductGrid = ({ products = [] }) => {
  if (!Array.isArray(products)) {
    return <div className="text-red-500">Invalid products data</div>;
  }

  if (products.length === 0) {
    return <div className="text-gray-500 p-4">No products found</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg p-3 shadow hover:shadow-lg transition"
        >
          <img
            src={product.images?.url}
            alt={product.images?.altText || product.name}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="mt-3 font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
