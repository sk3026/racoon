import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser, deleteUser, updateUser, fetchUsers } from "../../redux/slices/adminslice";

/* Input component */
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

/* Select component */
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  /* Protect admin route */
  useEffect(() => {

    if (!user || user.role !== "admin") {
      navigate("/login");
    }

    dispatch(fetchUsers());

  }, [user, dispatch, navigate]);

  /* Input change */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Add user */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    dispatch(addUser(formData));

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  /* Delete user */
  const handleDelete = (id) => {

    if (window.confirm("Are you sure you want to delete this user?")) {

      dispatch(deleteUser(id));

    }

  };

  /* Change role */
  const handleRoleChange = (id, role) => {

    dispatch(updateUser({ id, role }));

  };

  return (

    <div className="max-w-5xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-8">
        User Management
      </h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Add User Form */}

      <div className="bg-white shadow p-6 rounded-xl mb-10">

        <h3 className="text-lg font-semibold mb-4">
          Add New User
        </h3>

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
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Add User
          </button>

        </form>

      </div>

      {/* Users Table */}

      <div className="bg-white shadow p-6 rounded-xl">

        <h3 className="text-lg font-semibold mb-4">
          All Users
        </h3>

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

            {users.map((u) => (

              <tr key={u._id} className="border-b hover:bg-gray-50">

                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>

                <td className="p-3">

                  <select
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u._id, e.target.value)
                    }
                    className="border rounded p-1"
                  >

                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>

                  </select>

                </td>

                <td className="p-3">

                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default UserManagement;