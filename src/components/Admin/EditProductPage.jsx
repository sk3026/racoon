import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAdminProducts,
  updateAdminProduct,
} from "../../redux/slices/adminproductslice";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const selectedProduct = products.find((p) => p._id === id);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    sizes: [],
    images: [],
  });

  const sizeOptions = ["S", "M", "L", "XL"];
  const [uploading, setUploading] = useState(false);

  // Fetch products if needed
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAdminProducts());
    }
  }, [dispatch, products.length]);

  // Load selected product
  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        name: selectedProduct.name || "",
        price: selectedProduct.price || "",
        description: selectedProduct.description || "",
        sizes: selectedProduct.sizes || [],
        images: selectedProduct.images || [],
      });
    }
  }, [selectedProduct]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle size change
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, value]
        : prev.sizes.filter((s) => s !== value),
    }));
  };

  // Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl }],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Remove image
  const handleRemoveImage = (indexToRemove) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(
        updateAdminProduct({
          id,
          productData: product,
        })
      ).unwrap();
      navigate("/admin/product");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!selectedProduct && products.length > 0) return <p className="p-6">Product not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
          min="0"
          step="0.01"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows="4"
          required
        />

        {/* Sizes */}
        <div>
          <label className="block mb-2 font-medium">Sizes:</label>
          <div className="flex gap-4">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={size}
                  checked={product.sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="w-4 h-4"
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">Product Images:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full"
          />
          {uploading && <p className="text-blue-500 mt-1">Uploading...</p>}
        </div>

        {/* Image Preview */}
        {product.images.length > 0 && (
          <div>
            <label className="block mb-2 font-medium">Image Preview:</label>
            <div className="flex gap-2 flex-wrap">
              {product.images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img.url}
                    alt={`Product ${idx + 1}`}
                    className="w-20 h-20 object-cover border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/product")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;