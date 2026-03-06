import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Product/FeaturedCollection";
import FeaturesSection from "../components/Product/FeaturesSection";
import GenderCollection from "../components/Product/GenderCollection";
import NewArrivals from "../components/Product/NewArrivals";
import ProductDetail from "../components/Product/Productdetail";
import ProductGrid from "../components/Product/ProductGrid";

import { fetchProductsByFilters } from "../redux/slices/productslice";

const Home = () => {

  const dispatch = useDispatch();

  const { products, loading, error } =
    useSelector((state) => state.products);

  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {

    // fetch women products
    dispatch(
      fetchProductsByFilters({
        gender: "female",
        limit: 8,
      })
    );

    // fetch best seller
    const fetchBestSellers = async () => {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        setBestSellerProduct(response.data?.[0]);

      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };

    fetchBestSellers();

  }, [dispatch]);

  return (
    <div>

      <Hero />

      <GenderCollection />

      <NewArrivals />

      {/* BEST SELLER */}
      <h2 className="text-2xl font-bold text-center mt-12 mb-6">
        Best Sellers
      </h2>

      {bestSellerProduct ? (
        <ProductDetail productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center text-gray-500">
          Loading best sellers...
        </p>
      )}

      {/* WOMEN SECTION */}
      <div className="container mx-auto mt-20">

        <h2 className="text-2xl font-bold text-center mb-6">
          For Women
        </h2>

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
        />

      </div>

      <FeaturedCollection />

      <FeaturesSection />

    </div>
  );
};

export default Home;