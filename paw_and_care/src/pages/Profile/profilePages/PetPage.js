import React from "react";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import SideMenu from "../../../components/SideMenu/SideMenu";
import '../Profile.css'
import dog from '../../../assets/Pet profile/Labrador.jpg';


const PetPage = () => {
  return (
    <div className={'pet-page'}>
      <Header/>
      <div className={'main-section'}>
        <h1 >Profile</h1>
        <div className={'grid-container'}>
          <SideMenu/>
          <div className={'pet-card'}>
            <img src={dog} alt={dog} />
            <p>Name</p>
            <p>Species:</p>
            <p>Breed:</p>
            <p>Gender:</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default PetPage;