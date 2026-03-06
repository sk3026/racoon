import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);

  // Fetch Products
  useEffect(() => {
  const fetchNewArrivals = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
    );

    console.log("NEW ARRIVALS DATA:", response.data);

    setNewArrivals(response.data);
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
  }
};

    fetchNewArrivals();
  }, []);

  // Scroll Function
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update Buttons
  const updateScrollButton = () => {
    const container = scrollRef.current;

    if (!container) return;

    const leftScroll = container.scrollLeft;
    const rightScrollable =
      container.scrollWidth > leftScroll + container.clientWidth;

    setCanScrollLeft(leftScroll > 0);
    setCanScrollRight(rightScrollable);
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    container.addEventListener("scroll", updateScrollButton);
    updateScrollButton();

    return () => container.removeEventListener("scroll", updateScrollButton);
  }, [newArrivals]);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Products</h2>
        <p>Discover new products from Racoon with exciting offers</p>

        <div className="absolute right-0 bottom-[30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-2 rounded border bg-white text-black disabled:opacity-50"
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-2 rounded border bg-white text-black disabled:opacity-50"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="container mx-auto overflow-x-scroll flex space-x-6 scrollbar-hide"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%]"
          >
            <img
              src={product.images?.[0]?.url || "/placeholder.png"}
              alt={product.images?.[0]?.altText || product.name}
              className="w-full h-[300px] object-cover rounded-lg"
            />

            <Link to={`/product/${product._id}`} className="block">
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;