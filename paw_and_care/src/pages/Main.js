import Header from '../components/header';
import AppointmentButton from "../components/appointmentButton";
import './Main.css';
import './Services.css';
import '../assets/Лендинги/2202.q702.029.F.m005.c7.veterinary.jpg';
import '../assets/Services/2149100168.jpg';
import '../assets/Services/2147928582.jpg';
import '../assets/Services/Dental.jpg';
import Footer from '../components/footer';
import AllServicesButton from "../components/allServicesButton";
import cat from "../assets/Services/cat.png";
import pet_house from "../assets/SVG/pet-house.svg";
import smart_tracking from "../assets/SVG/smart-tracking.svg";
import all_in_one from "../assets/SVG/all-in-one.svg"
import {Link} from "react-router-dom";
import MoreButton from "../components/moreButton";


const Main = () => {
  return (
    <div>
      <Header/>

      <div className="ad-container">
        <h1>Compassionate Care for Your Pets
          <br/>Every Step of the Way</h1>
        <p>At Paw & Care, we are dedicated to providing the best care for
          <br/>your beloved pets. Whether it's a routine check-up, vaccinations,
          <br/>or more specialized care, our team of experienced veterinarians is
          <br/>here to ensure your pets stay healthy and happy.</p>
        <AppointmentButton/>
      </div>

      <div className="services-container">
        <h2>What we offer</h2>
        <div className="services-grid">
          <div className="services-card bg-general-checkup">
            <p>General Check-ups</p>
            <Link to="/general-checkups" className="arrow-link" />
          </div>
          <div className="services-card bg-vaccinations">
            <p>Vaccinations</p>
            <Link to="/vaccinations" className="arrow-link" />
          </div>
          <div className="services-card bg-dental-care">
            <p>Dental Care</p>
            <Link to="/dental-care" className="arrow-link" />
          </div>
        </div>
        <div className="services-button">
        <AllServicesButton/>
        </div>
      </div>

      <div>
        <div className="about-us-container">
          <div className="about-us-content">
            <h3>About Us</h3>
            <p>At Paw & Care, we are committed to providing top-quality care
              <br/>for your pets. Our experienced team of veterinarians offers
              <br/>a range of services, from routine check-ups to specialized
              <br/>treatments. We use the latest technology and methods to ensure
              <br/>your pet’s health and well-being. Trust us to keep your furry
              <br/>friends happy and healthy every step of the way.</p>
            <MoreButton/>
          </div>
          <div className="about-us-img">
            <img src={cat} alt="About Us"/>
          </div>
        </div>

        <div className="tabs-container">
          <div className="trusted-care">
            <img src={pet_house} alt="Trusted Care"/>
            <h3>Trusted Care</h3>
            <p>Personalized care, trusted veterinarians,
              <br/>and modern treatment methods — we care
              <br/>for your pets as if they were our own.</p>
          </div>
          <div className="smart-tracking">
            <img src={smart_tracking} alt="Smart Tracking"/>
            <h3>Smart Tracking</h3>
            <p>Access your pet’s personal dashboard,
              <br/>get reminders for visits and view medical
              <br/>records anytime, anywhere</p>
          </div>
          <div className="all-in-one">
            <img src={all_in_one} alt="All in One"/>
            <h3>All in One</h3>
            <p>Book appointments, receive prescriptions,
              <br/>track vaccinations and visits — all in one
              <br/>convenient place, without calls or waiting.</p>
          </div>
        </div>

        <div className="reviews-container">
          <h3>Customer Reviews</h3>
          <div className="navigational-buttons">
          </div>
          <div className="reviews-collection">
            <div className="review-cards">

            </div>
          </div>
        </div>

        <Footer/>

      </div>

    </div>
  )
};

export default Main;