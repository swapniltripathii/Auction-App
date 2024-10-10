import React from "react";
import NavbarTop from "../components/shared/NavbarTop";
import Apparels from "../components/categories/Apparels";
const Home = () => {
  return (
    <div className="w-full h-full  ">
      {/* this div is for navbars */}
      <div className="w-full h-32 ">
        <NavbarTop />
      </div>
      {/* this div is for home components */}
      
      <div className="w-full  bg-green-400">
           
      </div>

      <div>
        <Apparels/>
        </div>      
    </div>

  );
};



export default Home;
