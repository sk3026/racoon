import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminProducts,
  deleteProduct,
} from "../../redux/slices/adminproductslice";

const ProductManagement = () => {

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {

    dispatch(fetchAdminProducts());

  }, [dispatch]);

  const handleDelete = (id) => {

    if (window.confirm("Are you sure you want to delete this product?")) {

      dispatch(deleteProduct(id));

    }

  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6">
        Product Management
      </h2>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">

        <thead className="bg-gray-100">

          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Description</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>

        </thead>

        <tbody>

          {products?.length > 0 ? (

            products.map((product, idx) => (

              <tr
                key={product._id}
                className={`border-b hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >

                <td className="py-2 px-4">
                  {product.name}
                </td>

                <td className="py-2 px-4">
                  ₹{product.price}
                </td>

                <td className="py-2 px-4">
                  {product.description}
                </td>

                <td className="py-2 px-4 text-center">

                  <Link
                    to={`/admin/product/${product._id}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="4"
                className="py-2 px-4 text-center text-gray-500"
              >
                No products found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default ProductManagement;