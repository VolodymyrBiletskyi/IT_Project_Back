import React, { useState } from "react";
import "./SignUp.css";
// import ReactDOM from "react-dom/client";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";



const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const role ='owner';
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const navigate = useNavigate();


  async function SignUp () {

      const data = {
        name,
        email,
        phone,
        password,
        role,
        petName,
        species,
        breed
      };

      let result = await fetch('https://vetclinic-backend.ew.r.appspot.com/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      });

      result = await result.json();
      console.warn("data", data);
      console.warn("result", result);

      localStorage.setItem('user-info', JSON.stringify(result));
      navigate('/about-us');


  }

  const handleSubmit = (e) => {
    e.preventDefault();
    SignUp();
  };




  return (
    <div>
      <Header/>
    <div className="signup-container">
      <main className="signup-main">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name*</label>
            <input type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email*</label>
              <input type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     required/>
            </div>
          </div>
          <div className="form-group">
            <label>Pet's Name</label>
            <input type="text"
                   value={petName}
                   onChange={(e) => setPetName(e.target.value)}
                   required/>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Species*</label>
              <input type="text"
                     value={species}
                     onChange={(e) => setSpecies(e.target.value)}
                     required />
            </div>
            <div className="form-group">
              <label>Breed*</label>
              <input type="text"
                     value={breed}
                     onChange={(e) => setBreed(e.target.value)}
                     required />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="current-password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required/>
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