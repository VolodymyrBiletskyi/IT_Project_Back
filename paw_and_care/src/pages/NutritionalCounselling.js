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


const NutritionalCounselling = () => {
    return (
        <div>
            <Header />

            <Link to="/services" className="left-arrow-link" />

            <div className="service-card bg-service-nutritional-counselling">
                <h1>Nutritional Counselling</h1>
                <p>Proper nutrition is essential for your pet’s overall health, energy levels, and longevity.
                    <br/>Nutritional counseling helps pet owners understand their pet’s dietary needs, manage
                    <br/>weight, and address specific health concerns through a well-balanced diet.</p>
            </div>

            <div className="service-include-container">
                <h3>What the service includes:</h3>
                <ul className="checkmark-list">
                    <li><span style={{fontWeight: 500}}>Personalized diet plan</span> – tailored to your pet’s breed, age, weight, and activity level.</li>
                    <li><span style={{fontWeight: 500}}>Weight management guidance</span> – helping pets achieve and maintain a healthy weight.</li>
                    <li><span style={{fontWeight: 500}}>Nutritional recommendations</span> – for pets with food allergies, sensitivities, or special dietary needs</li>
                    <li><span style={{fontWeight: 500}}>Transitioning to a new diet</span> – guidance on switching pet food safely and effectively.</li>
                </ul>
            </div>

            <div className="service-forwho-container">
                <div className="forwho-image bg-forwho-nutritional-counselling"></div>
                <ul className="paw-list">
                    <li className="forwho-title">Who is this service for?</li>
                    <li> Pet owners who want to optimize their pet’s diet.</li>
                    <li>Overweight or underweight pets needing a structured feeding plan.</li>
                    <li>Pets with chronic health conditions requiring specialized nutrition.</li>
                </ul>
            </div>

            <div className="service-book-please">
                <h3>Book a Nutritional Counseling session today to ensure your pet gets the best possible nutrition!</h3>
                <AppointmentButton/>
            </div>

            <Footer />
        </div>
    )
}

export default NutritionalCounselling;