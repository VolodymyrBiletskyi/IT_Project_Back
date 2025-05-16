import React from 'react';
import { Link } from 'react-router-dom';
import './moreButton.css';

const MoreButton = () => {
  return (
      <Link to="/about-us"><button className="blue-btn">More</button></Link>
  )
}

export default MoreButton;