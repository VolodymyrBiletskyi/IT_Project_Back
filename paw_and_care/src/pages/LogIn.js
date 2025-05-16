import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from "../components/header";
import Footer from "../components/footer";
import './LogIn.css';
import { Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
const LogIn = () => {
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