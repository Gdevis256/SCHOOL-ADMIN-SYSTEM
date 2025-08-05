import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:px-24 py-12"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-10 rounded-lg max-w-3xl w-full shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 text-center">
          Welcome to
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 text-center">
          School Management System
        </h2>

        <p className="text-gray-700 mb-8 leading-relaxed text-justify">
          Streamline school management, class organization, and add students and faculty.
          Seamlessly track attendance, assess performance, and provide feedback.
          Access records, view marks, and communicate effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4">
          <button
            onClick={() => navigate("/ChoosePage")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow-md transition"
          >
            LOGIN
          </button>
          <button
            onClick={() => navigate("/guest")}
            className="border border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold px-6 py-2 rounded transition"
          >
            LOGIN AS GUEST
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-purple-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
