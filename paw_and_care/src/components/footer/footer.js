import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../../assets/SVG/logo.svg';
import phone from '../../assets/SVG/call.svg';
import mail from '../../assets/SVG/mail.svg';
import location from '../../assets/SVG/location_on.svg';
import clock from '../../assets/SVG/clock.svg';
import facebook from "../../assets/SVG/Facebook.svg";
import whatsapp from "../../assets/SVG/whatsapp.svg";
import instagram from "../../assets/SVG/instagram.svg";

const Footer = () =>{
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column-one">
          <div className="footer-logo">
            <Link to="/"><img src={logo} alt="Paw & Care"  className="logo" /></Link>
            <span><Link to="/">Paw & Care</Link></span>
          </div>
          <div className="contacts-section">
          <ul>
            <li><img src={phone} alt={phone}/>    +48 22 123 45 674</li>
            <li><img src={mail} alt={mail}/>    hello@pawandcare.com</li>
            <li><img src={location} alt={location}/>    ul. Kwiatowa 12, 60-123 Poznań, Poland</li>
            <li>
              <img src={clock} alt={clock}/>    08:00 – 20:00 <span className="highlight">(Monday - Saturday)</span><br/><br/>
              <span className="sub-highlight"> <p>Sunday:</p> Closed / Emergency Appointments Only</span>
            </li>
          </ul>
        </div>
        </div>
        <div className="information-section">
          <h4>Information</h4>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="links-section">
          <h4>Useful links</h4>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="socials-section">
          <a href="#"><img src={facebook} alt="Facebook" /></a>
          <a href="#"><img src={whatsapp} alt="WhatsApp" /></a>
          <a href="#"><img src={instagram} alt="Instagram" /></a>
        </div>
      </div>
    </footer>
  );
}

 export default Footer;