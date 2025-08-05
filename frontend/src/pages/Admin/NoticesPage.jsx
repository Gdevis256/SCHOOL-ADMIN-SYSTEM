import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState({ title: '', message: '', date: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchNotices = async () => {
    const res = await axios.get('http://localhost:5000/api/notices');
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/notices/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/notices', formData);
    }
    setFormData({ title: '', message: '', date: '' });
    fetchNotices();
  };

  const handleEdit = (notice) => {
    setFormData({ title: notice.title, message: notice.message, date: notice.date });
    setEditingId(notice.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/notices/${id}`);
    fetchNotices();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notices</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update Notice' : 'Add Notice'}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Message</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td className="border px-4 py-2">{notice.title}</td>
              <td className="border px-4 py-2">{notice.message}</td>
              <td className="border px-4 py-2">{notice.date}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(notice)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(notice.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoticesPage;
