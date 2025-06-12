import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../components/header';
import Footer from '../components/footer';
import '../assets/Лендинги/155657.jpg';
import './AboutUs.css';
import '../assets/SVG/pointer-about-us.svg';

const AboutUs = () => {
  return (
        <div>

            <Header />

          <div className="about-container">
              <h1>About Us</h1>
              <h3>Committed to Your Pet's Health and Happiness.</h3>
              <ul>
                <li>At Paw & Care, we are dedicated to providing the highest level of care for your pets.</li>
                <li>Our team of experienced veterinarians and specialists is always ready to help your
                  <br/>pet, offering both routine check-ups and specialized treatment when needed. </li>
                <li>We use modern equipment and treatment methods to detect any illnesses
                  <br/>at an early stage and provide quick assistance.</li>
                <li>Our goal is not only to treat but also to prevent potential problems,
                  <br/>ensuring your pets stay happy and healthy throughout their lives.</li>
              </ul>
          </div>

          <div className="quote-container">
            <h5>"At Paw & Care, our mission is to provide,
              <br/>high-quality care to ensure the health and well-being of your pets."</h5>
            <p> -James Anderson
              <br/>Owner of Paw & Care</p>
          </div>

          <div className="our-team">
            <h2>Our Team</h2>
            <div className="doctors">
            <div className="Michael-container">
              <p>Dr. Michael Reynolds</p>
            </div>
            <div className="Olivia-container">
              <p>Dr. Olivia Brooks</p>
            </div>
            <div className="David-container">
              <p>Dr. David Harrison</p>
            </div>
            </div>
          </div>

            <Footer />

        </div>
    )
}

export default AboutUs;