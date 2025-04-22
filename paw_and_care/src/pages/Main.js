import Header from '../components/header';
import AppointmentButton from "../components/appointmentButton";
import './Main.css';

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
    </div>
  )
};

export default Main;