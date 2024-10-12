import React from "react";
import { Link } from "react-router-dom";
import Apparels from "../components/categories/Apparels";
import Collectibles from "../components/categories/Collectibles";
import Sneakers from "../components/categories/Sneakers";
import localImage from "../assets/images/banner1.webp";
import localImage2 from "../assets/images/banner2.webp";
import logo from "../assets/images/logo.png"; 
import "../components/shared/NavbarBottom.css";

const Home = () => {
  return (
    <div className="w-full h-full">
      {/* Navbar */}
      <div className="w-full">
        <div className="fixed w-screen flex justify-between items-center h-24 p-8 shadow-md z-10 border-b bg-pink-200">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="BidRare Logo"
                className="h-24 pt-2 pb-2 w-50"
              />
            </Link>
          </div>
          <div className="flex-grow py-6 px-10">
            <input
              type="text"
              placeholder="Search for brand, color, etc."
              className="w-full p-3 border px-10 bg-gray-100 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/about"
              className="text-gray-900 px-2 text-lg font-medium"
            >
              About
            </Link>
            <Link to="/help" className="text-gray-900 px-3 text-lg font-medium">
              Help
            </Link>
            <Link to="/sell" className="text-gray-900 px-3 text-lg font-medium">
              Sell
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
            >
              Signup
            </Link>
          </div>
        </div>

        {/* Bottom Navbar */}
        <div className="fixed top-24 flex w-full justify-center items-center p-2 bg-gray-100 border-t border-b border-gray-300">
          <Link to="/apparels" className="nav-link">
            Apparels
          </Link>
          <Link to="/shoes" className="nav-link">
            Sneakers
          </Link>
          <Link to="/collectibles" className="nav-link">
            Collectibles
          </Link>
        </div>

        {/* Home Content */}
        <div className="p-4 mt-0 bg-blue-200">
          <div className="mt-36 pl-8 pr-8">
            <Apparels />
            <div className="my-4 flex justify-center rounded-2xl">
              <img
                src={localImage}
                alt="Local Banner 1"
                className="w-auto item-center rounded-3xl h-auto mx-2"
              />
              <img
                src={localImage2}
                alt="Local Banner 2"
                className="w-auto item-center ml-16 rounded-3xl h-auto mx-2"
              />
            </div>
            <Collectibles />
            <Sneakers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
