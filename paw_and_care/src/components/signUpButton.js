import React from 'react';
import { Link } from 'react-router-dom';
import './signUpButton.css';

const SignUpButton = () => {
  return (
    <div className="signUp-btn">
      <Link to="/sign-up"><button className="signUp-btn">Sign Up</button></Link>
    </div>
  )
}

export default SignUpButton;