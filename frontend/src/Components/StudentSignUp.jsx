import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const StudentSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden relative z-10">
        
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-purple-800 text-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-700 mb-6">
            Join us today by filling in the details below
          </p>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm text-purple-700 mb-1 block"
              >
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your fullname"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm text-purple-700 mb-1 block"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none"
                placeholder="Password *"
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5 text-gray-600" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none"
                placeholder="Confirm Password *"
                required
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <Eye className="w-5 h-5 text-gray-600" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              SIGN UP
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <a href="/student-login" className="text-purple-600 hover:underline">
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

export default StudentSignUp;
