import { useState } from "react";
import { Link } from "react-router-dom";

import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import Searchbar from "./Searchbar";
import Cartdrawer from "../Layout/Cartdrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);

  const navItems = [
    { id: "nav-about", name: "About", path: "/about" },
    { id: "nav-men", name: "Men", path: "/collection/all" },
    { id: "nav-women", name: "Women", path: "/collection/all" },
    { id: "nav-kids", name: "Kids", path: "/collection/all" },
  ];

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-6 px-8 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500">
          RACOON
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.id}
              id={item.id}
              to={item.path}
              className="relative text-gray-700 hover:text-purple-600 text-sm font-semibold uppercase tracking-wider transition-all duration-300 group py-2"
            >
              {item.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Admin Link */}
          <Link 
            to="/admin" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-purple-500/25"
          >
            Admin
          </Link>
            
          {/* Profile */}
          <Link 
            to="/profile" 
            className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 transition-all duration-300 transform hover:scale-110 group"
          >
            <HiOutlineUser className="h-5 w-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-300" />
          </Link>

          {/* Cart */}
          <button 
            onClick={toggleCartDrawer} 
            className="relative p-3 rounded-full bg-gray-100 hover:bg-pink-100 transition-all duration-300 transform hover:scale-110 group"
          >
            <HiOutlineShoppingBag className="h-5 w-5 text-gray-600 group-hover:text-pink-600 transition-colors duration-300" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              0
            </span>
          </button>

          {/* Search */}
          <div className="hidden sm:block">
            <Searchbar />
          </div>

          {/* Mobile Menu */}
          <button 
            onClick={toggleNavDrawer} 
            className="md:hidden p-3 rounded-full bg-gray-100 hover:bg-blue-100 transition-all duration-300 group"
          >
            <HiBars3BottomRight className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <Cartdrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div className={`fixed top-0 left-0 w-4/5 max-w-sm h-full bg-gradient-to-br from-white via-purple-50 to-pink-50 backdrop-blur-md shadow-2xl transform transition-all duration-500 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Close Button */}
        <div className="flex justify-between items-center p-6 border-b border-purple-200/50">
          <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Menu</h3>
          <button 
            onClick={toggleNavDrawer}
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-all duration-300 transform hover:rotate-90"
          >
            <IoMdClose className="h-5 w-5 text-purple-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col p-6 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={`mobile-${item.id}`}
              id={`mobile-${item.id}`}
              to={item.path}
              className="text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-lg font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={toggleNavDrawer}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Search */}
          <div className="pt-4 border-t border-purple-200/50 mt-4">
            <Searchbar />
          </div>
        </div>
      </div>

     
      {navDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-md transition-all duration-500" 
          onClick={toggleNavDrawer}
        />
      )}
    </>
  );
};

export default Navbar;