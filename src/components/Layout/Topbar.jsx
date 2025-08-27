import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-gray-900 text-gray-200 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-2 px-4">
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-white transition-colors">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Center Text */}
        <div className="py-1 md:py-0 text-center">
          Let's shop exciting products
        </div>

        {/* Phone */}
        <div className="hidden md:block">
          <a href="tel:+11111222333" className="hover:text-white transition-colors">
            +1 111-222-333
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
