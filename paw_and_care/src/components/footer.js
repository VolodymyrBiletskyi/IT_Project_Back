import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../assets/SVG/logo.svg';

const Footer = () =>{
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <img src="../assets/SVG/logo.svg" alt="Paw & Care" />
            <span>Paw & Care</span>
          </div>
          <ul>
            <li>📞 +48 22 123 45 674</li>
            <li>✉️ hello@pawandcare.com</li>
            <li>📍 ul. Kwiatowa 12, 60-123 Poznań, Poland</li>
            <li>
              🕗 08:00 – 20:00 <span className="highlight">(Monday - Saturday)</span><br />
              <span className="sub-highlight">Sunday: Closed / Emergency Appointments Only</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Information</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Useful links</h4>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="footer-section socials">
          {/*<a href="#"><img src="/icons/facebook.png" alt="Facebook" /></a>*/}
          {/*<a href="#"><img src="/icons/whatsapp.png" alt="WhatsApp" /></a>*/}
          {/*<a href="#"><img src="/icons/instagram.png" alt="Instagram" /></a>*/}
        </div>
      </div>
    </footer>
  );
}

 export default Footer;