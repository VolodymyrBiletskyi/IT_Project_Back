import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Services from './pages/Services';
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="services" element={<Services />} />/>
          <Route path="about-us" element={<AboutUs />} />/>/
        </Routes>
      </div>
    </Router>
  );
}

export default App;
