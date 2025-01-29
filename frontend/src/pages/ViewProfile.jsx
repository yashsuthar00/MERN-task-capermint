import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../utils/api';
import { useLoading } from '../context/LoadingContext';

function ViewProfile() {
  const { setLoading } = useLoading();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/profile`);
        setFormData(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error('Error fetching the user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    if (JSON.stringify(formData) === JSON.stringify(originalData)) {
      Swal.fire('Info', 'No changes made to the profile', 'info');
      setIsEditing(false);
      return;
    }
    
    setLoading(true);
    try {
      await api.put(`/profile/${id}`, formData);
      Swal.fire('Success', 'Profile updated successfully', 'success');
      setOriginalData(formData);
      setIsEditing(false);
    } catch (error) {
        console.error('Error updating the user data', error);
        if (error.response && error.response.data && error.response.data.message === 'Email already exists') {
          Swal.fire('Error', 'Email already exists. Please use a different email.', 'error');
        } else {
          Swal.fire('Error', 'Failed to update profile', 'error');
        }
    } finally {
      setLoading(false);
      }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          {isEditing ? (
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="Name" 
              autoComplete="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">{formData.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          {isEditing ? (
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="Email" 
              autoComplete="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">{formData.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          {isEditing ? (
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              placeholder="Password" 
              autoComplete="new-password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">********</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone number</label>
          {isEditing ? (
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
              placeholder="Phone number" 
              autoComplete="tel"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">{formData.phone}</p>
          )}
        </div>
        <div className="flex justify-end">
          {isEditing ? (
            <button 
              type="button" 
              onClick={handleSave} 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          ) : (
            <button 
              type="button" 
              onClick={() => setIsEditing(true)} 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;

