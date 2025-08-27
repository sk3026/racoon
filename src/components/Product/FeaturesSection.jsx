import { HiShoppingBag, HiArrowPathRoundedSquare, HiOutlineCreditCard } from "react-icons/hi2";

const FeaturesSection = () => {
  const features = [
    {
      icon: <HiShoppingBag className="text-4xl text-green-600" />,
      title: "Free International Shipping",
      description: "On all orders over $100.00",
    },
    {
      icon: <HiArrowPathRoundedSquare className="text-4xl text-green-600" />,
      title: "30 Days Return",
      description: "Money back guarantee",
    },
    {
      icon: <HiOutlineCreditCard className="text-4xl text-green-600" />,
      title: "Secured Checkout",
      description: "100% secured checkout",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 transition transform hover:-translate-y-1 hover:shadow-lg rounded-lg"
          >
            <div className="p-5 bg-green-100 rounded-full mb-4 flex items-center justify-center">
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
