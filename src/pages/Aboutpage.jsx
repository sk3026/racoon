import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-black text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          About Racoon
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Racoon is a modern fashion brand focused on delivering
          stylish, comfortable, and affordable clothing for everyone.
        </p>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322"
          alt="fashion"
          className="rounded-lg shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Our Story
          </h2>

          <p className="text-gray-600 mb-4">
            Racoon was founded with a simple idea — fashion should be
            accessible, stylish, and comfortable. Our collections are
            designed for modern lifestyles, combining quality materials
            with timeless designs.
          </p>

          <p className="text-gray-600">
            We carefully curate every product to ensure it reflects our
            commitment to craftsmanship, comfort, and contemporary style.
          </p>
        </div>

      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-10">
            Why Choose Racoon
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 border rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Our clothing is crafted with high-quality fabrics that
                ensure durability and comfort.
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">
                Modern Design
              </h3>
              <p className="text-gray-600">
                We bring the latest fashion trends to our collections,
                helping you stay stylish every season.
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">
                Customer First
              </h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We provide seamless
                shopping and reliable service.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          Discover Your Style
        </h2>

        <p className="mb-6">
          Explore our latest collections and find your perfect look.
        </p>

        <a
          href="/collections/all"
          className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200"
        >
          Shop Now
        </a>
      </div>

    </div>
  );
};

export default AboutPage;