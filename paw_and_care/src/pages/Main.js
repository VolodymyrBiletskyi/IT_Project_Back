import Header from '../components/header';
import AppointmentButton from "../components/appointmentButton";
import './Main.css';
import '../assets/Лендинги/2202.q702.029.F.m005.c7.veterinary.jpg'
import '../assets/Services/2149100168.jpg'
import '../assets/Services/2147928582.jpg'
import '../assets/Services/Dental.jpg'
import Footer from '../components/footer';

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
          <div className="general-checkup-service">
            <p>General Check-ups</p>
          </div>
          <div className="vaccinations-service">
            <a><p>Vaccinations</p></a>
          </div>
          <div className="dental-care-service">
            <p>Dental Care</p>
          </div>
        </div>
      </div>

      <div>
        <Footer/>
      </div>

    </div>
  )
};

export default Main;