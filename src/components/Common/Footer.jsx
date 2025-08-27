import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 border-t border-purple-200/50">
            {/* Main Footer Content */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-8 py-16">

                {/* Newsletter Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                        Newsletter
                    </h3>
                    <p className="text-gray-600 leading-relaxed">Get exciting offers on Racoon</p>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg">
                        <p className="font-semibold text-sm text-purple-700">🎉 Get 50% discount on sign up</p>
                    </div>

                    <form className="flex flex-col sm:flex-row gap-2 mt-6">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 p-3 text-sm border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                        />
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-purple-500/25">
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Shop Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800">Shop</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link to="#" className="text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center group">
                                <span className="w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                                Men's Top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center group">
                                <span className="w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                                Women's Top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center group">
                                <span className="w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                                Men's Bottom Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center group">
                                <span className="w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                                Women's Bottom Wear
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800">Support</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link to="#" className="text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center group">
                                <span className="w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center group">
                                <span className="w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                                Mail
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center group">
                                <span className="w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                                Phone No
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center group">
                                <span className="w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 rounded-full"></span>
                                Address
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800">Follow Us</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link to="#" className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-all duration-300 group p-2 rounded-lg hover:bg-purple-100/50">
                                <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-500 transition-all duration-300">
                                    <TbBrandMeta className="text-lg text-blue-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <span className="font-medium">Facebook</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-all duration-300 group p-2 rounded-lg hover:bg-purple-100/50">
                                <div className="p-2 rounded-full bg-pink-100 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                                    <IoLogoInstagram className="text-lg text-pink-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <span className="font-medium">Instagram</span>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Footer Bottom */}
            <div className="border-t border-purple-200/50 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-500 text-sm">
                            © 2025, <span className="font-semibold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">RACOON</span> - All rights reserved
                        </p>
                        <div className="flex space-x-6 text-sm text-gray-500">
                            <Link to="#" className="hover:text-purple-600 transition-colors duration-300">Privacy Policy</Link>
                            <Link to="#" className="hover:text-purple-600 transition-colors duration-300">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;