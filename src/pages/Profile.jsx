import { useState } from "react";
import MyOrder from "./MyOrder";
import { Link } from "react-router-dom";

const Profile = () => {
  // Simulated user state (replace with actual auth later)
  const [user, setUser] = useState({
    name: "Tony",
    email: "tony@gmail.com",
    isLoggedIn: true,
  });

  const handleLogout = () => {
    // Clear user info (replace with real logout logic)
    setUser({ name: "", email: "", isLoggedIn: false });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 bg-white">
            {user.isLoggedIn ? (
              <>
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{user.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/login"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-center transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="w-full md:h-2/3 lg:w-3/4">
            {user.isLoggedIn ? (
              <MyOrder />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
                Please login to view your orders.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
