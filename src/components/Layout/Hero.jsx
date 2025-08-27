import image from "../../assets/image.png";

const Hero = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <img
        src={image}
        alt="Hero"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />

      {/* Optional Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Optional Centered Text */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight">
          Welcome to RACOON
        </h1>
      </div> */}
    </section>
  );
};

export default Hero;
