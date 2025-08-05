import React from "react";
import { FaUser, FaUserGraduate, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    title: "Admin",
    icon: <FaUser className="text-3xl mb-3" />,
    description: "Login as an administrator to access the dashboard to manage app data.",
    path: "/admin-login",
  },
  {
    title: "Student",
    icon: <FaUserGraduate className="text-3xl mb-3" />,
    description: "Login as a student to explore course materials and assignments.",
    path: "/student-login",
  },
  {
    title: "Teacher",
    icon: <FaUsers className="text-3xl mb-3" />,
    description: "Login as a teacher to create courses, assignments, and track student progress.",
    path : "/teacher-login",
  },
];

const ChoosePage = () => {
  const navigate = useNavigate();

  const handleClick = (role) => {
    if (role.path) navigate(role.path);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-16"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => handleClick(role)}
            className="bg-white rounded-md shadow-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-purple-50 cursor-pointer"
          >
            <div className="text-gray-800 flex flex-col items-center">
              {role.icon}
              <h3 className="text-xl font-bold mb-2">{role.title}</h3>
              <p className="text-gray-600 text-sm">{role.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoosePage;
