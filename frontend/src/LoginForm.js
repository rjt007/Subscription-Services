import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css'; 


function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send Login data to server
      const response = await axios.post('https://subscription-services-api.onrender.com/api/user/login', formData);
      if (response.data) {
        //Set AccessToken to LocalStorage
        localStorage.setItem('accessToken',response.data.accessToken);
        alert('Login successful!');
      } else {
        alert('Login failed. Please try again.');
      }      
      //Navigate to PlanSelect route
      navigate('/plans');
    } catch (error) {
      alert('Login failed - '+ error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2><br />
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
