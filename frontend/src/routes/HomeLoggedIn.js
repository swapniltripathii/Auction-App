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
import { Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the right arrow icon

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
        <h1 className="text-black text-2xl font-sans font-semibold mb-4">
          Welcome, {currentUser?.displayName || "User"}
        </h1>

        {/* Product Listings Grid */}
        <div className="px-4 md:px-16">
          {/* Apparels Section */}
          <div className="flex justify-between items-center pt-1 pl-4">
            <div className="text-2xl font-semibold">Apparels</div>
            <Link to="/apparels" className="flex items-center text-blue-500 hover:text-blue-700">
              See More
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <Apparels limit={2} />

          {/* Sneakers Section */}
          <div className="flex justify-between items-center pt-1 pl-4">
            <div className="text-2xl font-semibold">Sneakers</div>
            <Link to="/sneakers" className="flex items-center text-blue-500 hover:text-blue-700">
              See More
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <Sneakers limit={2} />

          {/* Accessories Section */}
          <div className="flex justify-between items-center pt-1 pl-4">
            <div className="text-2xl font-semibold">Accessories</div>
            <Link to="/accessories" className="flex items-center text-blue-500 hover:text-blue-700">
              See More
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <Accessory limit={2} />

          {/* Images Section */}
          <div className="my-4 flex flex-col md:flex-row justify-center space-x-6 rounded-2xl">
            <img
              src={localImage}
              alt="Local"
              className="w-full md:w-auto rounded-3xl h-auto mb-4 md:mb-0 md:mr-4 shadow-lg"
            />
            <img
              src={localImage2}
              alt="Local"
              className="w-full md:w-auto rounded-3xl h-auto shadow-lg"
            />
          </div>

          {/* Collectibles Section */}
          <div className="flex justify-between items-center pt-1 pl-4">
            <div className="text-2xl font-semibold">Collectibles</div>
            <Link to="/collectibles" className="flex items-center text-blue-500 hover:text-blue-700">
              See More
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-5 ml-1" />
            </Link>
          </div>
          <Collectibles limit={2} />

          {/* Electronics Section */}
          <div className="flex justify-between items-center pt-1 pl-4">
            <div className="text-2xl font-semibold">Electronics</div>
            <Link to="/electronics" className="flex items-center  text-blue-500 hover:text-blue-700">
              See More
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <Electron limit={2} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeLoggedIn;
