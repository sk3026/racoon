import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // install with: npm install uuid

// 🔹 Input field component
const InputField = ({ label, type, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

// 🔹 Select dropdown component
const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const UserManagement = () => {
  // Users list state
  const [users, setUsers] = useState([
    { id: uuidv4(), name: "John", email: "john@example.com", role: "admin" },
    { id: uuidv4(), name: "Alice", email: "alice@example.com", role: "customer" },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new user
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    const newUser = {
      id: uuidv4(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      // password is captured but not displayed in table
    };

    setUsers((prev) => [...prev, newUser]);
    console.log("User added:", newUser);

    // Reset form
    setFormData({ name: "", email: "", password: "", role: "customer" });
  };

  // Delete user with confirmation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  // Change role inline
  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">User Management</h2>

      {/* Add User Form */}
      <div className="bg-white shadow p-6 rounded-xl mb-10">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <SelectField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            options={[
              { value: "customer", label: "Customer" },
              { value: "admin", label: "Admin" },
            ]}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">All Users</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-b hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className={`border rounded p-1 ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
