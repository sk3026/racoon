import React, { useState } from "react";

const EditProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    sizes: [],
    images: [],
  });

  const sizeOptions = ["S", "M", "L", "XL"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, value]
        : prev.sizes.filter((s) => s !== value),
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setProduct((prev) => ({ ...prev, images: [...prev.images, ...imagesArray] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    alert("Product updated! Check console.");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          {sizeOptions.map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                value={size}
                checked={product.sizes.includes(size)}
                onChange={handleSizeChange}
              />{" "}
              {size}
            </label>
          ))}
        </div>

        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex gap-2 flex-wrap mt-2">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={`Product ${idx + 1}`}
              className="w-20 h-20 object-cover border rounded"
            />
          ))}
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
