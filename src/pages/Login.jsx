import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import login from "../assets/login.png";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../redux/slices/authslice";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || null;

  const isCheckoutRedirect = redirectPath?.includes("checkout");

  /* HANDLE REDIRECT AFTER LOGIN */

  useEffect(() => {

    if (!user) return;

    if (redirectPath) {

      if (cart?.products?.length > 0 && guestId) {

        dispatch(
          mergeCart({ userId: user.id, guestId })
        ).then(() => {

          navigate(isCheckoutRedirect ? "/checkout" : redirectPath);

        });

      } else {

        navigate(isCheckoutRedirect ? "/checkout" : redirectPath);

      }

    }

  }, [user,guestId, cart, isCheckoutRedirect, dispatch, navigate]);

  /* HANDLE LOGIN */

  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {

        toast.success("Login successful!");

        if (!redirectPath) {
          navigate("/");
        }

      })
      .catch((error) => {

        toast.error(error?.message || "Login failed!");

      });

  };

  return (

    <div className="flex min-h-screen">

      {/* LEFT SIDE FORM */}

      <div className="w-full md:w-1/2 flex justify-center items-center">

        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border">

          <form onSubmit={handleSubmit}>

            <div className="flex justify-center mb-6">
              <h2 className="text-xl font-medium">Racoon</h2>
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">
              Hey there 👋
            </h2>

            <p className="text-center mb-6 text-gray-600">
              Enter your email and password to login
            </p>

            {/* EMAIL */}

            <div className="mb-4">

              <label className="block text-sm font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email address"
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-4">

              <label className="block text-sm font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
                required
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Sign In
            </button>

            {/* REGISTER LINK */}

            <p className="mt-6 text-center text-sm">

              Don't have an account?{" "}

              <Link
                to={`/register?redirect=${encodeURIComponent(redirectPath || "/")}`}
                className="text-blue-500 hover:underline"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

      {/* RIGHT SIDE IMAGE */}

      <div className="relative hidden md:flex w-1/2 bg-gray-800 justify-center items-center">

        <img src={login} alt="Login Illustration" />

      </div>

    </div>

  );

};

export default Login;