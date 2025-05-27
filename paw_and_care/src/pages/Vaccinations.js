import { Link } from 'react-router-dom';
import Header from '../components/header';
import AppointmentButton from "../components/appointmentButton";
import './Services.css';
import '../assets/Services/2149100168.jpg';
import '../assets/Services/d3ef6479d835713b77354aa668019d1b4720b038.jpg';
import '../assets/Services/Vector2.png';
import '../assets/Services/check-mark-svgrepo-com 1.png';
import '../assets/Services/paw-svgrepo-com 1.png';
import Footer from '../components/footer';

const Vaccinations = () => {
    return (
        <div>
            <Header />

            <Link to="/services" className="left-arrow-link" />

            <div className="service-card bg-service-vaccinations">
                <h1>Vaccinations</h1>
                <p>Vaccinations are an essential part of preventive healthcare, protecting your pet from
                    <br/>dangerous infectious diseases. Our veterinarians administer high-quality, safe
                    <br/>vaccines tailored to your pet’s age, breed, and health condition.</p>
            </div>

            <div className="service-include-container">
                <h3>What the service includes:</h3>
                <ul className="checkmark-list">
                    <li><span style={{fontWeight: 500}}>Initial consultation</span> – assessing your pet’s health and determining the necessary vaccines.</li>
                    <li><span style={{fontWeight: 500}}>Administration of core vaccines</span> – protection against common and life-threatening diseases.</li>
                    <li><span style={{fontWeight: 500}}>Vaccination schedule planning</span> – setting up reminders for boosters and future vaccinations.</li>
                    <li><span style={{fontWeight: 500}}>Post-vaccination monitoring </span> – observing your pet for any immediate reactions.</li>
                </ul>
            </div>

            <div className="service-forwho-container">
                <div className="forwho-image bg-forwho-vaccinations"></div>
                <ul className="paw-list">
                    <li className="forwho-title">Who is this service for?</li>
                    <li>Puppies and kittens for their first set of vaccinations.</li>
                    <li>Adult pets needing annual boosters.</li>
                    <li>Pets that travel, stay in kennels, or interact with other animals.</li>
                </ul>
            </div>

            <div className="service-book-please">
                <h3>Book a Vaccination appointment today to keep your pet safe and protected!</h3>
                <AppointmentButton/>
            </div>

            <Footer />
        </div>
    )
}

export default Vaccinations;