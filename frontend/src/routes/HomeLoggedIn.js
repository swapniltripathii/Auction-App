import React, { useEffect, useState } from "react";
import NavbarTop from "../components/shared/NavbarTop";
import { useAuth } from "../contexts/authContext/authcontext"; // Import useAuth to access the context
import Apparels from "../components/categories/Apparels";
import Collectibles from "../components/categories/Collectibles";
import Sneakers from "../components/categories/Sneakers";
import axios from "axios";
// import localImage from "../assets/images/banner1.webp"; // Import the local image
// import localImage2 from "../assets/images/banner2.webp";
import SliderCard from "../components/SliderCard";
import Footer from "../components/Footer";
import Accessory from "../components/categories/Accessory";
import Electron from "../components/categories/Electron";
const HomeLoggedIn = () => {
  const { currentUser } = useAuth();

  return (
    <div className="w-full h-full">
      {/* Navbar */}
      <div className="w-full h-32">
        <NavbarTop />
      </div>

      {/* Home content */}
      <div className="w-full p-4 bg-gray-200">
        <h1 className="text-black text-2xl font-sansi text-semibold">
          Welcome, {currentUser?.displayName || "User"}
        </h1>

        {/* Product Listings Grid */}
        <div className="pl-8 pr-8">
          <Apparels />
          {/* Local Image */}
          {/* <div className="my-4 flex justify-center rounded-2xl">
            <img
            Banner#
              src={localImage}
              alt="Local"
              className="w-auto item-center  rounded-3xl h-auto"
            />
            <img
              src={localImage2}
              alt="Local"
              className="w-auto item-center ml-10 rounded-3xl  h-auto"
            />
          </div> */}
          <SliderCard />
          <Sneakers />
          <Accessory/>
          <Collectibles />
          <Electron/>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLoggedIn;
