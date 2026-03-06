import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState({
    category: "",
    colors: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
    gender: "",
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  // IMPORTANT: must match database values
  const categories = ["Top Wear", "Bottom Wear"];

  const colors = ["red", "blue", "green", "black", "white"];
  const sizes = ["S", "M", "L", "XL"];
  const materials = ["cotton", "polyester", "wool"];
  const brands = ["Nike", "Adidas", "Puma"];
  const genders = ["male", "female", "unisex"];


  // Sync URL → state
  useEffect(() => {

    const param = Object.fromEntries(searchParams.entries());

    setFilter({
      category: param.category || "",
      colors: param.colors || "",
      size: param.size ? param.size.split(",") : [],
      material: param.material ? param.material.split(",") : [],
      brand: param.brand ? param.brand.split(",") : [],
      minPrice: param.minPrice || 0,
      maxPrice: param.maxPrice || 1000,
      gender: param.gender || "",
    });

    setPriceRange([
      param.minPrice || 0,
      param.maxPrice || 1000
    ]);

  }, [searchParams]);


  // Update URL when filters change
  useEffect(() => {

    const params = {};

    if (filter.category) params.category = filter.category;
    if (filter.gender) params.gender = filter.gender;

    if (filter.size.length)
      params.size = filter.size.join(",");

    if (filter.material.length)
      params.material = filter.material.join(",");

    if (filter.brand.length)
      params.brand = filter.brand.join(",");

    if (filter.colors)
      params.colors = filter.colors;

    if (filter.minPrice)
      params.minPrice = filter.minPrice;

    if (filter.maxPrice)
      params.maxPrice = filter.maxPrice;

    setSearchParams(params);

  }, [filter]);


  return (

    <div className="p-4 border rounded-md space-y-6">

      {/* CATEGORY */}

      <div>
        <label className="block font-medium mb-2">
          Category
        </label>

        {categories.map((category) => (

          <div key={category} className="flex items-center mb-1">

            <input
              type="radio"
              name="category"
              checked={filter.category === category}
              onChange={() =>
                setFilter({ ...filter, category })
              }
              className="mr-2"
            />

            <span>{category}</span>

          </div>

        ))}

      </div>



      {/* GENDER */}

      <div>

        <label className="block font-medium mb-2">
          Gender
        </label>

        {genders.map((g) => (

          <div key={g} className="flex items-center mb-1">

            <input
              type="radio"
              name="gender"
              checked={filter.gender === g}
              onChange={() =>
                setFilter({ ...filter, gender: g })
              }
              className="mr-2"
            />

            <span>{g}</span>

          </div>

        ))}

      </div>



      {/* COLOR */}

      <div>

        <label className="block font-medium mb-2">
          Color
        </label>

        <div className="flex flex-wrap gap-2">

          {colors.map((color) => (

            <button
              key={color}
              onClick={() =>
                setFilter({ ...filter, colors: color })
              }
              className={`w-8 h-8 rounded-full border-2 ${
                filter.colors === color
                  ? "border-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
            />

          ))}

        </div>

      </div>



      {/* SIZE */}

      <div>

        <label className="block font-medium mb-2">
          Size
        </label>

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

                setFilter({
                  ...filter,
                  size: newSizes
                });

              }}
              className="mr-2"
            />

            <span>{size}</span>

          </div>

        ))}

      </div>



      {/* MATERIAL */}

      <div>

        <label className="block font-medium mb-2">
          Material
        </label>

        {materials.map((material) => (

          <div key={material} className="flex items-center mb-1">

            <input
              type="checkbox"
              checked={filter.material.includes(material)}
              onChange={(e) => {

                const newMaterials = e.target.checked
                  ? [...filter.material, material]
                  : filter.material.filter(
                      (m) => m !== material
                    );

                setFilter({
                  ...filter,
                  material: newMaterials
                });

              }}
              className="mr-2"
            />

            <span>{material}</span>

          </div>

        ))}

      </div>



      {/* BRAND */}

      <div>

        <label className="block font-medium mb-2">
          Brand
        </label>

        {brands.map((brand) => (

          <div key={brand} className="flex items-center mb-1">

            <input
              type="checkbox"
              checked={filter.brand.includes(brand)}
              onChange={(e) => {

                const newBrands = e.target.checked
                  ? [...filter.brand, brand]
                  : filter.brand.filter(
                      (b) => b !== brand
                    );

                setFilter({
                  ...filter,
                  brand: newBrands
                });

              }}
              className="mr-2"
            />

            <span>{brand}</span>

          </div>

        ))}

      </div>



      {/* PRICE */}

      <div>

        <label className="block font-medium mb-2">
          Price Range
        </label>

        <input
          type="range"
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={(e) => {

            const value = Number(e.target.value);

            setPriceRange([0, value]);

            setFilter({
              ...filter,
              maxPrice: value
            });

          }}
          className="w-full"
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