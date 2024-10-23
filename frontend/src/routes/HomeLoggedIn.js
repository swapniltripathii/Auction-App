import React from "react";
import NavbarTop from "../components/shared/NavbarTop";
import { useAuth } from "../contexts/authContext/authcontext";
import Apparels from "../components/categories/Apparels";
import Collectibles from "../components/categories/Collectibles";
import Sneakers from "../components/categories/Sneakers";
import localImage from "../assets/images/banner_1.png";
import localImage2 from "../assets/images/banner_2.webp";
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
        <h1 className="text-black text-2xl font-sans font-semibold">
          Welcome, {currentUser?.displayName || "User"}
        </h1>

        {/* Product Listings Grid */}
        <div className="px-4 md:px-16">
          <div className="pt-1 pl-4 text-2xl font-semibold">Apparels</div>
          <Apparels />
          <SliderCard />
          <div className="pt-1 pl-4 text-2xl font-semibold">Sneakers</div>
          <Sneakers />
          <div className="pt-1 pl-4 text-2xl font-semibold">Accessories</div>
          <Accessory />
          <div className="my-4 flex flex-col md:flex-row justify-center rounded-2xl">
            <img
              src={localImage}
              alt="Local"
              className="w-full md:w-auto rounded-3xl h-auto mb-4 md:mb-0 md:mr-4"
            />
            <img
              src={localImage2}
              alt="Local"
              className="w-full md:w-auto rounded-3xl h-auto"
            />
          </div>
          <div className="pt-1 pl-4 text-2xl font-semibold">Collectibles</div>
          <Collectibles />
          <div className="pt-1 pl-4 text-2xl font-semibold">Electronics</div>
          <Electron />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLoggedIn;
