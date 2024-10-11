import React from "react";
import NavbarTop from "../components/shared/NavbarTop";
import Apparels from "../components/categories/Apparels";
import Collectibles from "../components/categories/Collectibles";
import Sneakers from "../components/categories/Sneakers";
const Home = () => {
  return (
    <div className="w-full h-full">
      {/* Navbar section */}
      <div className="w-full h-32">
        <NavbarTop />
      </div>

      {/* This div is for home components */}
      <div className="w-full bg-green-400 h-48">
        {/* Any other content you'd like to add */}
      </div>

      {/* Apparels section */}
      <div className="p-4">
        <Apparels />
        <Collectibles/>
        <Sneakers/>
      </div>  
    </div>
  );
};

export default Home;
