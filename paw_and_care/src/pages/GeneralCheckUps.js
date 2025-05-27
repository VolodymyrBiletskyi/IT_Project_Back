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


const GeneralCheckUps = () => {
    return (
        <div>
            <Header />

            <Link to="/services" className="left-arrow-link" />

            <div className="service-card bg-service-general-checkup">
                <h1>General Check-ups</h1>
                <p>Regular preventive examinations that help maintain your pet’s health and detect
                    <br/>potential illnesses at an early stage. The veterinarian conducts a comprehensive
                    <br/>assessment, provides recommendations on care, nutrition, and vaccinations.</p>
            </div>

            <div className="service-include-container">
                <h3>What the service includes:</h3>
                <ul className="checkmark-list">
                    <li><span style={{fontWeight: 500}}>Weight and temperature measurement</span> – monitoring key health indicators.</li>
                    <li><span style={{fontWeight: 500}}>Heart and lung auscultation</span> – detecting possible abnormalities in the cardiovascular and respiratory systems.</li>
                    <li><span style={{fontWeight: 500}}>Abdominal palpation</span> – checking internal organs for abnormalities.</li>
                    <li><span style={{fontWeight: 500}}>Evaluation of joints and musculoskeletal system</span> – assessing mobility, pain, or inflammation.</li>
                </ul>
            </div>

            <div className="service-forwho-container">
                <div className="forwho-image bg-forwho-general-checkup"></div>
                <ul className="paw-list">
                    <li className="forwho-title">Who is this service for?</li>
                    <li>Pet owners for routine annual check-ups.</li>
                    <li>Young animals for developmental assessment.</li>
                    <li>Pets showing potential health concerns.</li>
                </ul>
            </div>

            <div className="service-book-please">
                <h3>Book General Check-ups to keep your pet healthy and happy!</h3>
                <AppointmentButton/>
            </div>

            <Footer />
        </div>
    )
}

export default GeneralCheckUps;