import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Optional: for separate styling
import logo from '../assets/SVG/logo.svg'; // adjust path if different
import './appointmentButton';
import AppointmentButton from "./appointmentButton";
import SignUpButton from "./signUpButton";

const Header = () => {
  return (
    <div className="header-container">
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Paw & Care" className="logo" />
        <span className="brand-name">Paw & Care</span>
      </div>
      <nav className="nav-links">
        <Link to="/about">About Us</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="nav-buttons">
        <AppointmentButton/>
        <SignUpButton/>
      </div>
    </header>
    </div>
  );
};

export default Header;
