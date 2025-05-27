import { Link } from 'react-router-dom';
import Header from '../components/header';
import './Services.css';
import '../assets/Services/2149100168.jpg';
import '../assets/Services/2147928582.jpg';
import '../assets/Services/Dental.jpg';
import  '../assets/Services/Grooming.jpg';
import  '../assets/Services/Laboratory Tests.jpg';
import  '../assets/Services/Nutritional Counseling.jpg';
import  '../assets/Services/Vector.png';
import Footer from '../components/footer';

const Services = () => {
    return (
        <div>
            <Header/>

            <div className="full-services-container">
                <h2>What we offer</h2>
                <div className="services-grid">
                    <div className="services-card bg-general-checkup">
                        <p>General Check-ups</p>
                        <Link to="/general-checkups" className="arrow-link" />
                    </div>
                    <div className="services-card bg-vaccinations">
                        <a><p>Vaccinations</p></a>
                        <Link to="/vaccinations" className="arrow-link" />
                    </div>
                    <div className="services-card bg-dental-care">
                        <p>Dental Care</p>
                        <Link to="/dental-care" className="arrow-link" />
                    </div>
                    <div className="services-card bg-grooming">
                        <p>Grooming</p>
                        <Link to="/grooming" className="arrow-link" />
                    </div>
                    <div className="services-card bg-laboratory-tests">
                        <p>Laboratory Tests</p>
                        <Link to="/lab-tests" className="arrow-link" />
                    </div>
                    <div className="services-card bg-nutritional-counseling">
                        <p>Nutritional Counseling</p>
                        <Link to="/nutrition" className="arrow-link" />
                    </div>
                </div>
            </div>

            <Footer/>

        </div>
    );
};

export default Services;