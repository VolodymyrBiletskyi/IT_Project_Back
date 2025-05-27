import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from "../components/header";
import Footer from "../components/footer";
import './LogIn.css';
import { Link, useNavigate } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
const LogIn = () => {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Allows redirect after login

    // Form submit handler
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page reload

      try {
        // Send request to /api/auth/login
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Send email and password as JSON
        });

        if (!response.ok) {
          // Handle login failure (e.g., 401 Unauthorized)
          throw new Error('Invalid email or password');
        }

        const data = await response.json();

        console.log('Login successful:', data);
        alert('Login successful!');

        // Save token or user data (if returned) to localStorage (or a global store)
        localStorage.setItem('token', data.token); // Assuming the backend returns a token

        // Navigate to a different page on success (e.g., dashboard or home)
        navigate('/dashboard'); // Replace '/dashboard' with your target route
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    };

    return (
    <div>
      <Header/>
    <div className="login-container">
      <main className="login-main">
        <h1 className="login-title">Log In</h1>
        <form className="login-form">
          <div className="form-row">
            <div className="form-group">
              <label>Email*</label>
              <input type="email" required />
            </div>
            </div>
          <div className="form-group">
            <label>Password*</label>
            <input type="password" required />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <Link to="/sign-up"><button type="button" className="signup-btn">Sign Up</button></Link>
          </div>
          <p className="required-note">* Indicates a required field</p>
        </form>
      </main>
    </div>
      <Footer/>
    </div>
  )
};

export default LogIn;