import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import login from "../assets/login.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authslice"; // ADD THIS IMPORT

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate("/"); // Redirect to home or dashboard
      })
      .catch((error) => {
        toast.error(error?.message || "Login failed!");
      });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side form */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
              <h2 className="text-xl font-medium">Racoon</h2>
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">Hey there 👋</h2>
            <p className="text-center mb-6 text-gray-600">
              Enter your username and password to login
            </p>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Sign In
            </button>

            <p className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side image */}
      <div className="relative hidden md:flex w-1/2 bg-gray-800 justify-center items-center">
        <img src={login} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;