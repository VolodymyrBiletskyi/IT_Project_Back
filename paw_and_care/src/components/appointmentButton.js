import React from 'react';
import { Link } from 'react-router-dom';
import './appointmentButton.css';

const AppointmentButton = () => {
  return (
  <div className="appointment-btn">

    <Link to="appointment-request"><button className="orange-btn">Request Appointment</button></Link>
  </div>
  )
}

export default AppointmentButton;