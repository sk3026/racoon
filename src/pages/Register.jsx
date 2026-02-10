import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import register from "../assets/register.png";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authslice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error?.message || "Registration failed!");
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

            <h2 className="text-2xl font-bold text-center mb-6">
              Create Account
            </h2>

            {/* Name */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Name"
              required
            />

            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Email"
              required
            />

            {/* Password */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Password"
              required
            />

            {/* Confirm Password */}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Confirm Password"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Register
            </button>

            {/* Login link */}
            <p className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side image */}
      <div className="relative hidden md:flex w-1/2 bg-gray-800 justify-center items-center">
        <img src={register} alt="Register Illustration" />
      </div>
    </div>
  );
};

export default Register;
