import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        // Save token and user info to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/Admin"); // or use: navigate(`/dashboard/${user.role}`)
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    } catch (error) {
      const msg = error.response?.data?.error || "Login failed. Please try again.";
      setErrorMsg(msg);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden relative z-10">
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-purple-800 text-center mb-2">
            Admin Login
          </h2>
          <p className="text-center text-gray-700 mb-6">
            Welcome back! Please enter your details
          </p>

          {errorMsg && (
            <div className="text-red-600 text-center mb-4">{errorMsg}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm text-purple-700 mb-1 block">
                Enter your email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none"
                placeholder="Password *"
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye className="w-5 h-5 text-gray-600" /> : <EyeOff className="w-5 h-5 text-gray-600" />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              LOGIN
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            <a href="/admin-signup" className="text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-100 relative">
          <div className="w-40 h-40 bg-gradient-to-r from-purple-700 to-purple-500 rounded-full absolute top-1/3 translate-y-1/2 shadow-2xl blur-xl opacity-90" />
          <div className="w-40 h-20 bg-gray-100 absolute top-1/2 translate-y-[-50%]" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
