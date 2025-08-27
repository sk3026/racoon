import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import ProductGrid from "../components/Product/ProductGrid";
import SortOption from "../components/Product/SortOption";
import Filtersidebar from "../components/Product/Filtersidebar";

const Collectionpage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Close sidebar on outside click (mobile/tablet only)
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulate API fetch
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = Array.from({ length: 8 }, (_, i) => ({
        _id: String(i + 1),
        name: "Stylish Jacket",
        price: 120,
        images: {
          url: `https://picsum.photos/500/500?random=${i + 1}`,
          altText: "Stylish Jacket",
        },
      }));
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* Filter button for mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center bg-gray-100 rounded-md shadow mb-4"
      >
        <FaFilter className="mr-2" />
        Filter
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:block`}
      >
        <div className="p-4 border-b font-bold text-lg">Filters</div>
        <div className="p-4">
          <Filtersidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Collection</h2>
          <SortOption />
        </div>

        {/* Products grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Collectionpage;
