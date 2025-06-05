import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../assets/SVG/logo.svg';
import AppointmentButton from "./appointmentButton";
import SignUpButton from "./signUpButton";
import profile_picture_test from "../assets/Img Docktor/Office girl.jpg";
import arrow from "../assets/SVG/arrow-up-340-svgrepo-com 2.svg";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const navigate = useNavigate();

  const logout = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    localStorage.removeItem('user-info');
    navigate('/log-in');
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userInfo = localStorage.getItem('user-info')
    ? JSON.parse(localStorage.getItem('user-info'))
    : null;

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setOpen(!open);
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className="logo-container">
          <Link to="/"><img src={logo} alt="Paw & Care" className="logo" /></Link>
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
          {userInfo ? (
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <div className={`profile-container ${open ? 'active' : ''}`} onClick={toggleDropdown}>
                <img src={profile_picture_test} className="profile-image" alt={'profile picture'}/>
                <div className={`menu-trigger ${open ? 'active' : ''}`} onClick={toggleDropdown}>
                  {/*<img src={arrow} className={"arrow-icon" } alt={'arrow-icon'}/>*/}
                </div>
              </div>

              {open && (
                <div className="dropdown-menu" onClick={e => e.stopPropagation()}>
                  <div className="dropdown-header">
                    <div className="user-name">{userInfo.name || 'User Name'}</div>
                    <div className="user-email">{userInfo.email || 'user@example.com'}</div>
                    <div className="user-phone">{userInfo.phone || '+123 456 789'}</div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <Link to="/profile" className="dropdown-item" onClick={e => e.stopPropagation()}>
                    My Profile
                  </Link>
                  <button className="dropdown-item" onClick={logout}>Log out</button>
                  <Link to="/remove-account" className="dropdown-item danger" onClick={e => e.stopPropagation()}>
                    Remove Account
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <SignUpButton/>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;