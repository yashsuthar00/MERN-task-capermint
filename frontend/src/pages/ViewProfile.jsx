import React, { useState, useEffect } from 'react';

function ViewProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    // Fetch user data from API and set it to formData
  }, []);

  return (
    <form>
      <input type="text" name="name" value={formData.name} readOnly placeholder="Name" />
      <input type="email" name="email" value={formData.email} readOnly placeholder="Email" />
      <input type="password" name="password" value={formData.password} readOnly placeholder="Password" />
      <input type="text" name="phone" value={formData.phone} readOnly placeholder="Phone number" />
    </form>
  );
}

export default ViewProfile;
