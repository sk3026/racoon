import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductGrid from "../components/Product/ProductGrid";
import SortOption from "../components/Product/SortOption";
import Filtersidebar from "../components/Product/Filtersidebar";

import { fetchProductsByFilters } from "../redux/slices/productslice";

const Collectionpage = () => {

  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } =
    useSelector((state) => state.products);

  const queryParams = Object.fromEntries([...searchParams]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {

    const filters = { ...queryParams };

    if (collection && collection !== "all") {
      filters.collection = collection;
    }

    dispatch(fetchProductsByFilters(filters));

  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () =>
    setIsSidebarOpen((prev) => !prev);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        window.innerWidth < 1024 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  return (

    <div className="flex flex-col lg:flex-row">

      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex items-center bg-gray-100 rounded-md m-4"
      >
        <FaFilter className="mr-2" />
        Filter
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow transform transition-transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0`}
      >

        <div className="p-4 border-b font-bold">
          Filters
        </div>

        <div className="p-4">
          <Filtersidebar />
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold capitalize">
            {collection === "all" ? "All Products" : collection}
          </h2>

          <SortOption />

        </div>

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
        />

      </div>

    </div>
  );
};

export default Collectionpage;