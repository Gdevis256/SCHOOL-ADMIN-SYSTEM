import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        if (res.data.avatar) {
          setPreview(`http://localhost:5000/uploads/${res.data.avatar}`);
        }
      } catch (err) {
        setErrorMsg(err.response?.data?.error || 'Failed to load profile.');
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setErrorMsg('User not authenticated.');
    }
  }, [token]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    if (!avatar) return alert('Please choose an image file');

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/profile/avatar',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Avatar updated successfully!');
      setUser((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to upload avatar');
    }
  };

  if (errorMsg) return <div className="text-red-500 text-center mt-4">{errorMsg}</div>;
  if (!user) return <div className="text-center mt-4">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded text-center">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">User Profile</h2>
      <div className="mb-4">
        <img
          src={preview}
          alt="Avatar"
          className="mx-auto w-28 h-28 rounded-full object-cover border border-gray-300"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="mt-2"
        />
        <button
          onClick={handleAvatarUpload}
          className="mt-2 px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Upload Avatar
        </button>
      </div>
      <div className="space-y-2 text-left">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
