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


const Grooming = () => {
    return (
        <div>
            <Header />

            <Link to="/services" className="left-arrow-link" />

            <div className="service-card bg-service-grooming">
                <h1>Grooming</h1>
                <p>Grooming is essential for your pet’s hygiene, comfort, and overall well-being. Our
                    <br/>professional grooming services ensure your pet looks great and stays healthy by
                    <br/>maintaining clean fur, trimmed nails, and healthy skin.</p>
            </div>

            <div className="service-include-container">
                <h3>What the service includes:</h3>
                <ul className="checkmark-list">
                    <li><span style={{fontWeight: 500}}>Bathing & coat conditioning</span> – deep cleansing and moisturizing for a healthy coat.</li>
                    <li><span style={{fontWeight: 500}}>Brushing & de-shedding</span> – removing loose hair to prevent matting and reduce shedding.</li>
                    <li><span style={{fontWeight: 500}}>Hair trimming & styling</span> – breed-specific cuts or custom styling.</li>
                    <li><span style={{fontWeight: 500}}>Nail trimming & paw care</span> – preventing overgrowth and discomfort.</li>
                </ul>
            </div>

            <div className="service-forwho-container">
                <div className="forwho-image bg-forwho-grooming"></div>
                <ul className="paw-list">
                    <li className="forwho-title">Who is this service for?</li>
                    <li>Pets with long or thick coats prone to tangling and matting.</li>
                    <li>Breeds that require regular haircuts (e.g., Poodles, Shih, Tzus).</li>
                    <li>Pets with sensitive skin needing special care.</li>
                </ul>
            </div>

            <div className="service-book-please">
                <h3>Book a Grooming appointment today for a clean, happy, and stylish pet!</h3>
                <AppointmentButton/>
            </div>

            <Footer />
        </div>
    )
}

export default Grooming;