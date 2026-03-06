import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import Searchbar from "./Searchbar";
import Cartdrawer from "../Layout/Cartdrawer";

const Navbar = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  /* GET CART ITEMS */

  const items = useSelector((state) => state.cart.items);

  /* GET USER */

  const { user } = useSelector((state) => state.auth);

  /* CART COUNT */

  const cartItemCount = Array.isArray(items)
    ? items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const navItems = [
    { id: "nav-about", name: "About", path: "/about" },
    { id: "nav-all", name: "All", path: "/collection/all" },
    { id: "nav-men", name: "Men", path: "/collection/men" },
    { id: "nav-women", name: "Women", path: "/collection/women" },
  ];

  return (
    <>
      {/* NAVBAR */}

      <nav className="container mx-auto flex items-center justify-between py-6 px-8 bg-white border-b">

        {/* LOGO */}

        <Link to="/" className="text-2xl font-bold">
          RACOON
        </Link>

        {/* DESKTOP NAV */}

        <div className="hidden md:flex items-center space-x-8">

          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="text-gray-700 hover:text-black text-sm font-semibold uppercase"
            >
              {item.name}
            </Link>
          ))}

        </div>

        {/* RIGHT ICONS */}

        <div className="flex items-center space-x-5">

          {/* ADMIN BUTTON */}

          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="text-sm font-semibold text-gray-700 hover:text-black"
            >
              Admin
            </Link>
          )}

          {/* PROFILE */}

          <Link to="/profile">
            <HiOutlineUser className="h-6 w-6" />
          </Link>

          {/* CART */}

          <button
            onClick={toggleCartDrawer}
            className="relative"
          >

            <HiOutlineShoppingBag className="h-6 w-6" />

            {cartItemCount > 0 && (

              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>

            )}

          </button>

          {/* SEARCH */}

          <div className="hidden sm:block">
            <Searchbar />
          </div>

          {/* MOBILE MENU */}

          <button
            onClick={toggleNavDrawer}
            className="md:hidden"
          >
            <HiBars3BottomRight className="h-6 w-6" />
          </button>

        </div>

      </nav>

      {/* CART DRAWER */}

      <Cartdrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

      {/* MOBILE NAV */}

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center p-4 border-b">

          <h3 className="font-bold">
            Menu
          </h3>

          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6" />
          </button>

        </div>

        <div className="flex flex-col p-4 space-y-4">

          {navItems.map((item) => (

            <Link
              key={item.id}
              to={item.path}
              onClick={toggleNavDrawer}
              className="text-gray-700 hover:text-black"
            >
              {item.name}
            </Link>

          ))}

          {/* ADMIN MOBILE */}

          {user && user.role === "admin" && (
            <Link
              to="/admin"
              onClick={toggleNavDrawer}
              className="text-gray-700 hover:text-black"
            >
              Admin Dashboard
            </Link>
          )}

        </div>

      </div>
    </>
  );
};

export default Navbar;