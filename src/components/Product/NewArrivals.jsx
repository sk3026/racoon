import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const newArrival = [
    { _id: "1", name: "Stylish Jacket", price: 120, images: { url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" } },
    { _id: "2", name: "Stylish Jacket", price: 120, images: { url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket" } },
    { _id: "3", name: "Stylish Jacket", price: 120, images: { url: "https://picsum.photos/500/500?random=3", altText: "Stylish Jacket" } },
    { _id: "4", name: "Stylish Jacket", price: 120, images: { url: "https://picsum.photos/500/500?random=4", altText: "Stylish Jacket" } },
    { _id: "5", name: "Stylish Jacket", price: 120, images: { url: "https://picsum.photos/500/500?random=5", altText: "Stylish Jacket" } },
    { _id: "6", name: "Stylish Jacket", price: 120, images: { url: "https://picsum.photos/500/500?random=6", altText: "Stylish Jacket" } },
    { _id: "7", name: "Stylish Jacket", price: 120, images: { url: "https://picsum.photos/500/500?random=7", altText: "Stylish Jacket" } },
    { _id: "8", name: "Stylish Jacket", price: 120, images: { url: "https://picsum.photos/500/500?random=8", altText: "Stylish Jacket" } },
  ];

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButton = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButton);
      updateScrollButton(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButton);
      }
    };
  }, []);

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
        className="container mx-auto overflow-x-scroll flex space-x-6 relative scrollbar-hide"
      >
        {newArrival.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images.url}
              alt={product.images.altText}
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
