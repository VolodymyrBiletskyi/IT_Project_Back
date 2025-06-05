import React, { useState } from 'react';
import './Profile.css';
import Header from "../components/header";
import Footer from "../components/footer";

const PersonalAccount = () => {
  const [activeTab, setActiveTab] = useState('portfolio');

  const Section = ({ title, children }) => (
    <div className="sidebar-section">
      <h3>{title}</h3>
      <div className="section-content">{children}</div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="main-section">
        <h1>Profile</h1>
        <div className={"menu-container"}>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PersonalAccount;