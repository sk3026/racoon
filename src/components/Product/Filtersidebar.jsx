import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: "",
    priceRange: "",
    colors: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
    gender: "",
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = ["top wear", "bottom wear"];
  const colors = ["red", "blue", "green", "black", "white"];
  const sizes = ["S", "M", "L", "XL"];
  const materials = ["cotton", "polyester", "wool"];
  const brands = ["Nike", "Adidas", "Puma"];
  const genders = ["male", "female", "unisex"];

  // Sync filters from URL -> State
  useEffect(() => {
    const param = Object.fromEntries(searchParams.entries());

    setFilter({
      category: param.category || "",
      priceRange: param.priceRange || "",
      colors: param.colors || "",
      size: param.size ? param.size.split(",") : [],
      material: param.material ? param.material.split(",") : [],
      brand: param.brand ? param.brand.split(",") : [],
      minPrice: param.minPrice || 0,
      maxPrice: param.maxPrice || 1000,
      gender: param.gender || "",
    });

    setPriceRange([param.minPrice || 0, param.maxPrice || 1000]);
  }, [searchParams]);

  // Update search params whenever filter changes
  useEffect(() => {
    const params = {};

    if (filter.category) params.category = filter.category;
    if (filter.gender) params.gender = filter.gender;
    if (filter.size.length) params.size = filter.size.join(",");
    if (filter.material.length) params.material = filter.material.join(",");
    if (filter.brand.length) params.brand = filter.brand.join(",");
    if (filter.colors) params.colors = filter.colors;
    if (filter.minPrice) params.minPrice = filter.minPrice;
    if (filter.maxPrice) params.maxPrice = filter.maxPrice;

    setSearchParams(params);
  }, [filter, setSearchParams]);

  return (
    <div className="p-4 border rounded-md space-y-6">
      {/* Category Filter */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filter.category === category}
              onChange={() => setFilter({ ...filter, category })}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Gender</label>
        {genders.map((g) => (
          <div key={g} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={filter.gender === g}
              onChange={() => setFilter({ ...filter, gender: g })}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span>{g}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setFilter({ ...filter, colors: color })}
              className={`w-8 h-8 rounded-full border-2 ${
                filter.colors === color ? "border-black" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={size}
              checked={filter.size.includes(size)}
              onChange={(e) => {
                const newSizes = e.target.checked
                  ? [...filter.size, size]
                  : filter.size.filter((s) => s !== size);
                setFilter({ ...filter, size: newSizes });
              }}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span>{size}</span>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={material}
              checked={filter.material.includes(material)}
              onChange={(e) => {
                const newMaterials = e.target.checked
                  ? [...filter.material, material]
                  : filter.material.filter((m) => m !== material);
                setFilter({ ...filter, material: newMaterials });
              }}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span>{material}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={brand}
              checked={filter.brand.includes(brand)}
              onChange={(e) => {
                const newBrands = e.target.checked
                  ? [...filter.brand, brand]
                  : filter.brand.filter((b) => b !== brand);
                setFilter({ ...filter, brand: newBrands });
              }}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span>{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Price Range</label>
        <input
          type="range"
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={(e) => {
            setPriceRange([0, Number(e.target.value)]);
            setFilter({ ...filter, maxPrice: Number(e.target.value) });
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-1">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
