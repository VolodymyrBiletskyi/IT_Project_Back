import { Link } from "react-router-dom";
import React from "react";
import arrow from "../../assets/SVG/arrow-right.svg";
import './allServicesButton.css';

const ViewAllServices = () => {
  return (
    <div className="viewAll-btn">
      <Link to="services"><button className="white-btn">View All Services <img src={arrow} alt={arrow}/></button></Link>
    </div>
  )
}

export default ViewAllServices;