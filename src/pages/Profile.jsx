import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MyOrder from "./MyOrder";

import { logout } from "../redux/slices/authslice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* REDIRECT IF NOT LOGGED IN */

  useEffect(() => {

    if (!user) {
      navigate("/login");
    }

  }, [user, navigate]);

  /* PREVENT PAGE FLASH WHILE REDIRECTING */

  if (!user) return null;

  /* HANDLE LOGOUT */

  const handleLogout = () => {

    dispatch(logout());
    dispatch(clearCart());

    navigate("/login");

  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-50">

      <div className="flex-grow container mx-auto p-4 md:p-6">

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">

          {/* LEFT PROFILE SECTION */}

          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 bg-white">

            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {user?.name}
            </h1>

            <p className="text-lg text-gray-600 mb-4">
              {user?.email}
            </p>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

          {/* RIGHT ORDERS SECTION */}

          <div className="w-full md:w-2/3 lg:w-3/4">

            <MyOrder />

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;