import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const AdminSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "admin", 
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed.");
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
            Create Admin Account
          </h2>
          <p className="text-center text-gray-700 mb-4">
            Fill in the form to register as an admin
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-2 border border-purple-600 rounded-md"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 border border-purple-600 rounded-md"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              SIGN UP
            </button>

            {message && <p className="text-center text-sm mt-2 text-red-600">{message}</p>}
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <a href="/admin-login" className="text-purple-600 hover:underline">
              Login
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

export default AdminSignUp;
