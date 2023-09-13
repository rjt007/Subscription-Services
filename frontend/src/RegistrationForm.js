import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Form.css'; 

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to server
      await axios.post('https://subscription-services-api.onrender.com/api/user/register', formData);
      alert('Registration successful!');
      //Navigate to login page
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2><br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            required
            placeholder="Username"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
