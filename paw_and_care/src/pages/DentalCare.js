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


const DentalCare = () => {
    return (
        <div>
            <Header />

            <Link to="/services" className="left-arrow-link" />

            <div className="service-card bg-service-dental-care">
                <h1>Dental Care</h1>
                <p>Dental Care is crucial for maintaining your pet’s overall health, preventing oral diseases,
                    <br/>and ensuring fresh breath. Our veterinarians provide professional dental check-ups,
                    <br/>cleanings, and treatments to keep your pet’s teeth and gums in top condition.</p>
            </div>

            <div className="service-include-container">
                <h3>What the service includes:</h3>
                <ul className="checkmark-list">
                    <li><span style={{fontWeight: 500}}>Oral health assessment</span> – checking teeth, gums, and mouth for signs of disease.</li>
                    <li><span style={{fontWeight: 500}}>Plaque and tartar removal</span> – professional scaling to prevent gum disease.</li>
                    <li><span style={{fontWeight: 500}}>Polishing</span> – smoothing tooth surfaces to reduce future plaque buildup.</li>
                    <li><span style={{fontWeight: 500}}>Gum disease treatment</span> – addressing gingivitis and periodontal issues.</li>
                </ul>
            </div>

            <div className="service-forwho-container">
                <div className="forwho-image bg-forwho-dental-care"></div>
                <ul className="paw-list">
                    <li className="forwho-title">Who is this service for?</li>
                    <li>Pets with bad breath, swollen gums, or difficulty eating.</li>
                    <li>Breeds at higher risk of dental issues (e.g., small dog breeds).</li>
                    <li>Any pet as part of routine oral hygiene care.</li>
                </ul>
            </div>

            <div className="service-book-please">
                <h3>Book a Dental Care appointment today for a healthy smile and fresh breath!</h3>
                <AppointmentButton/>
            </div>

            <Footer />
        </div>
    )
}

export default DentalCare;