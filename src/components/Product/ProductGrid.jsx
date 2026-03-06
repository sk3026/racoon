import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products = [], loading, error }) => {

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-400">No products available</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

      {products.map((product) => (

        <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="border rounded-lg p-3 shadow hover:shadow-lg transition block"
        >

          <img
            src={product?.images?.url?.[0] || "/placeholder.png"}
            alt={product?.images?.altText || product.name}
            className="w-full h-48 object-cover rounded"
          />

          <h3 className="mt-3 font-semibold">
            {product.name}
          </h3>

          <p className="text-gray-600">
            ₹{product.price}
          </p>

        </Link>

      ))}

    </div>
  );
};

export default ProductGrid;