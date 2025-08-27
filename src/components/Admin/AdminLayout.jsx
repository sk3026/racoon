import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";   // ✅ import Outlet
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* mobile toggle Button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20 items-center">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Panel</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <div className="p-4">
          <AdminSidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />   {/* ✅ This is where AdminHomepage (or users, products, etc.) will render */}
      </div>
    </div>
  );
};

export default AdminLayout;
