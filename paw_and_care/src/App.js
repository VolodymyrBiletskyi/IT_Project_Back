import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Services from './pages/Services';
import AboutUs from "./pages/AboutUs";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/services" element={<Services />} />/>
          <Route path="/about-us" element={<AboutUs />} />/>/
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
