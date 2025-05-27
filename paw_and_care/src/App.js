import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Services from './pages/Services';
import AboutUs from "./pages/AboutUs";
import GeneralCheckUps from "./pages/GeneralCheckUps";
import Vaccinations from "./pages/Vaccinations";
import DentalCare from "./pages/DentalCare";
import Grooming from "./pages/Grooming";
import LaboratoryTests from "./pages/LaboratoryTests";
import NutritionalCounselling from "./pages/NutritionalCounselling";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="services" element={<Services />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="/general-checkups" element={<GeneralCheckUps />} />
          <Route path="/vaccinations" element={<Vaccinations />} />
          <Route path="/dental-care" element={<DentalCare />} />
          <Route path="/grooming" element={<Grooming />} />
          <Route path="/lab-tests" element={<LaboratoryTests />} />
          <Route path="/nutrition" element={<NutritionalCounselling />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
