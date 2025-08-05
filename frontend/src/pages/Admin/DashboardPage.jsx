import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:5000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load dashboard'));
  }, []);

  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!stats) return <div className="text-center mt-4">Loading dashboard...</div>;

  const cards = [
    { label: 'Classes', count: stats.classes, path: '/Admin/classes' },
    { label: 'Subjects', count: stats.subjects, path: '/Admin/subjects' },
    { label: 'Teachers', count: stats.teachers, path: '/Admin/teachers' },
    { label: 'Notices', count: stats.notices, path: '/Admin/Notices' },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-10 cursor-pointer transform transition duration-300 hover:text-purple-600 hover:scale-105">
          ADMIN DASHBOARD
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link to={card.path} key={card.label}>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-purple-50 cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-600">{card.label}</h3>
              <p className="text-3xl font-bold text-purple-700">{card.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
