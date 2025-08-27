import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic (e.g., clear tokens) if needed
    navigate("/");
  };

  const linkClasses = ({ isActive }) =>
    isActive
      ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
      : "text-white hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2";

  return (
    <div className="bg-gray-800 text-white w-64 p-6 min-h-screen mt-10cd">
      {/* Logo */}
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-bold">
          Racoon
        </Link>
      </div>

      <h2 className="text-xl font-medium mb-6 text-center">Admin Panel</h2>

      {/* Navigation */}
      <nav className="flex flex-col space-y-4">
        <NavLink to="/admin/users" className={linkClasses}>
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/product" className={linkClasses}>
          <FaBoxOpen />
          <span>Product</span>
        </NavLink>

        <NavLink to="/admin/order" className={linkClasses}>
          <FaClipboardList />
          <span>Order</span>
        </NavLink>

        <NavLink to="/" className={linkClasses}>
          <FaStore />
          <span>Shop</span>
        </NavLink>

        {/* Logout */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full flex items-center justify-center"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
