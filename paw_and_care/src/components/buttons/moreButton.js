import React from 'react';
import { Link } from 'react-router-dom';
import './moreButton.css';

const MoreButton = () => {
  return (
  <div className="more-btn">
    <Link to="about-us"><button className="blue-btn">More</button></Link>
  </div>
  )
}

export default MoreButton;