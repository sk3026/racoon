import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import register from "../assets/register.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // ✅ for redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Mock registration logic
    console.log("Name:", name, "Email:", email, "Password:", password);
    toast.success("Registration successful!");

    // Clear fields
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // ✅ Redirect to Profile page
    navigate("/profile");
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

            <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

            {/* Name */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Name"
            />

            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Email"
            />

            {/* Password */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Password"
            />

            {/* Confirm Password */}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Confirm Password"
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
