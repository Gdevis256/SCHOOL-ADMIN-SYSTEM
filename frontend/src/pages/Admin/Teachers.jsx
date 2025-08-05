import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchTeachers = async () => {
    const res = await axios.get('http://localhost:5000/api/teachers');
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/teachers/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/teachers', formData);
    }
    setFormData({ name: '', email: '', subject: '' });
    fetchTeachers();
  };

  const handleEdit = (teacher) => {
    setFormData({ name: teacher.name, email: teacher.email, subject: teacher.subject });
    setEditingId(teacher.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/teachers/${id}`);
    fetchTeachers();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Teachers</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update Teacher' : 'Add Teacher'}
        </button>
      </form>

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="border px-4 py-2">{teacher.name}</td>
              <td className="border px-4 py-2">{teacher.email}</td>
              <td className="border px-4 py-2">{teacher.subject}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(teacher)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(teacher.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
