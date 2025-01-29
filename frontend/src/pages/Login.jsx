import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

function Login() {
  const { setLoading } = useLoading();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields are required',
      });
      return false;
    }
    return true;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/login', formData);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      console.log("login successful");  
        navigate("/admin/products");
    } catch (error) {
      console.error('Error logging in:', error);  
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'Invalid email or password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold">
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
