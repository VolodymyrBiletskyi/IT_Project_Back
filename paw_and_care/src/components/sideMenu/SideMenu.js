import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/Profile/Profile.css';
import { useLocation } from 'react-router-dom';


const SideMenu = () => {
  const location = useLocation();
  return (
    <div className="main-section">
      <div className="menu-container">
        <ul>
          <Link
            to={'/profile/pets'} className={'pet-link'} style={location.pathname === '/profile/pets' ? { background: '#086788', color: 'white' } : {}}>
            <ol>Pet</ol>
          </Link>
          <Link to={'/profile/medical-records'} className={'med-records'} style={location.pathname === '/profile/medical-records' ? { background: '#086788', color: 'white' } : {}}>
            <ol>Medical Records</ol>
          </Link>
          <Link to={'/profile/visits'} className={'visits'} style={location.pathname === '/profile/visits' ? { background: '#086788', color: 'white' } : {}}>
            <ol>Visits</ol>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default SideMenu;
