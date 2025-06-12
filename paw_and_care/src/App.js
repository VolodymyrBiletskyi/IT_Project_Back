import React, { Profiler } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Services from './pages/Services';
import AboutUs from "./pages/AboutUs";
import GeneralCheckUps from "./pages/GeneralCheckUps";
import Vaccinations from "./pages/Vaccinations";
import DentalCare from "./pages/DentalCare";
import Grooming from "./pages/Grooming";
import LaboratoryTests from "./pages/LaboratoryTests";
import NutritionalCounselling from "./pages/NutritionalCounselling";
import LogIn from "./pages/Login/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import PasswordReset from "./pages/PasswordRecovery/PasswordReset";
import PasswordRecoveryRequest from "./pages/PasswordRecovery/PasswordRecoveryRequest";
import Profile from "./pages/Profile/Profile";
import PasswordRecoverySuccess from "./pages/PasswordRecovery/PasswordRecoverySuccess";
import AccountDeletion from "./pages/AccountDeletion/AccountDeletion";
import PageDeletionSuccess from "./pages/AccountDeletion/PageDeletionSuccess";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/general-checkups" element={<GeneralCheckUps />} />
          <Route path="/vaccinations" element={<Vaccinations />} />
          <Route path="/dental-care" element={<DentalCare />} />
          <Route path="/grooming" element={<Grooming />} />
          <Route path="/lab-tests" element={<LaboratoryTests />} />
          <Route path="/nutrition" element={<NutritionalCounselling />} />
          <Route path="/services" element={<Services />} />/>
          <Route path="/about-us" element={<AboutUs />} />/>/
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/password-reset-request" element={<PasswordRecoveryRequest />} />
          <Route path="/auth/reset-password/:token" element={<PasswordReset />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/password-reset-success" element={<PasswordRecoverySuccess />} />
          <Route path="/remove-account" element={<AccountDeletion />} />
          <Route path="/remove-account-success" element={<PageDeletionSuccess />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
