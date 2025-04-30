import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../assets/SVG/logo.svg';
import './appointmentButton';
import AppointmentButton from "./appointmentButton";
import SignUpButton from "./signUpButton";

const Header = () => {
  return (
    <div className="header-container">
    <header className="header">
      <div className="logo-container">
        <Link to="/"><img src={logo} alt="Paw & Care"  className="logo" /></Link>
        <span className="brand-name"><Link to="/">Paw & Care</Link></span>
      </div>
      <div className="links-container">
      <nav className="nav-links">
        <Link to="/about-us">About Us</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      </div>

      <div className="nav-buttons">
        <AppointmentButton/>
        <SignUpButton/>
      </div>
    </header>
    </div>
  );
};

export default Header;
