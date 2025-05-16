import React, { useState } from "react";
import "./SignUp.css";
import ReactDOM from "react-dom/client";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    petName: "",
    species: "",
    breed: "",
    agreeToTerms: false,
  });

  // Handle input changes to update formData
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form's default behavior (page refresh)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // Handle success
      const data = await response.json();
      console.log("Registration successful:", data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    }
  };


  return (
    <div>
      <Header/>
    <div className="signup-container">
      <main className="signup-main">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form">
          <div className="form-group">
            <label>Full Name*</label>
            <input type="text" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email*</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" />
            </div>
          </div>
          <div className="form-group">
            <label>Pet's Name</label>
            <input type="text" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Species*</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Breed*</label>
              <input type="text" required />
            </div>
          </div>
          <div className="form-checkbox">
            <input type="checkbox" required />
            <span className="checkbox-text">
             By registering, I acknowledge that I have read and agree to the <a href="#"> Terms of Service</a> and
              <br/> <a href="#"> Privacy Policy</a>. I consent to the processing of my data as outlined in the <a href="#"> Privacy Policy</a>.
            </span>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <Link to="/log-in"><button type="button" className="login-btn">Log In</button></Link>
          </div>
          <p className="required-note">* Indicates a required field</p>
        </form>
      </main>
    </div>
      <Footer/>
    </div>
  );
}

export default SignUp;