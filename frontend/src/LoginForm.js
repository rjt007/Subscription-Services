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
      const response = await axios.post('http://localhost:8000/api/user/login', formData);

      //Set AccessToken to LocalStorage
      localStorage.setItem('accessToken',response.data.accessToken);
      
      alert('Login successful!');
      
      //Navigate to PlanSelect route
      navigate('/plans');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
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
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
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
