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


const LaboratoryTests = () => {
    return (
        <div>
            <Header />

            <Link to="/services" className="left-arrow-link" />

            <div className="service-card bg-service-laboratory-tests">
                <h1>Laboratory Tests</h1>
                <p>Laboratory tests are essential for diagnosing and monitoring your pet’s health. They
                    <br/>help detect infections, organ dysfunction, and underlying conditions before symptoms
                    <br/>appear, allowing for early treatment and better outcomes.</p>
            </div>

            <div className="service-include-container">
                <h3>What the service includes:</h3>
                <ul className="checkmark-list">
                    <li><span style={{fontWeight: 500}}>Complete Blood Count (CBC)</span> – evaluates red and white blood cells, detecting infections, anemia, and immune responses.</li>
                    <li><span style={{fontWeight: 500}}>Blood Chemistry Panel</span> – assesses liver, kidney, and pancreatic function.</li>
                    <li><span style={{fontWeight: 500}}>Urinalysis</span> – checks kidney health, hydration levels, and potential urinary infections.</li>
                    <li><span style={{fontWeight: 500}}> Hormone Testing</span> – identifies endocrine disorders like diabetes or thyroid imbalances.</li>
                </ul>
            </div>

            <div className="service-forwho-container">
                <div className="forwho-image bg-forwho-laboratory-tests"></div>
                <ul className="paw-list">
                    <li className="forwho-title">Who is this service for?</li>
                    <li>Pets requiring routine health monitoring.</li>
                    <li>Animals with unexplained symptoms like weight loss, lethargy, or vomiting.</li>
                    <li>Pets with chronic conditions like diabetes or kidney disease.</li>
                </ul>
            </div>

            <div className="service-book-please">
                <h3>Schedule a Laboratory Test today to ensure your pet stays healthy and well-monitored!</h3>
                <AppointmentButton/>
            </div>

            <Footer />
        </div>
    )
}

export default LaboratoryTests;