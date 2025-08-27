import React from "react";
import { Link } from "react-router-dom";
import male from "../../assets/male.png";
import female from "../../assets/female.png";

const collections = [
  { image: male, title: "Men Collection", gender: "men" },
  { image: female, title: "Women Collection", gender: "women" },
];

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {collections.map(({ image, title, gender }, index) => (
          <div key={index} className="relative flex-1 overflow-hidden rounded-lg">
            <img
              src={image}
              alt={title}
              className="w-full h-[700px] object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-sm p-4 rounded">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {title}
              </h2>
              <Link
                to={`/collection/all?gender=${gender}`}
                className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenderCollection;
