import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavbarBottom.css";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/authContext/authcontext";
import { FaUser, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

// Animation for buttons
const buttonAnimation = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const NavbarTop = () => {
  const { userLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      {/* Top Navbar */}
      <div className="fixed w-screen flex justify-between items-center h-24 p-8 bg-neutral-100 shadow-md z-10 border-b bg-gray-200">
        <div className="flex items-center">
          <Link to="/home">
            <img src={logo} alt="BidRare Logo" className="h-24 w-50" />
          </Link>
        </div>

        <div className="flex-grow py-6 px-12 ml-2 mr-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 border px-10 bg-gray-100 border border-black rounded"
          />
        </div>

        <div className="flex items-center space-x-8">
          {/* About, Help, Sell with animation */}
          <motion.div
            variants={buttonAnimation}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/about" className="text-gray-900 px-1 text-xl font-medium">
              About
            </Link>
          </motion.div>
          <motion.div
            variants={buttonAnimation}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/help" className="text-gray-900 px-1 text-xl font-medium">
              Help
            </Link>
          </motion.div>
          <motion.div
            variants={buttonAnimation}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/sell" className="text-gray-900 px-2 text-xl font-medium">
              Sell
            </Link>
          </motion.div>

          {/* User and Favourites */}
          {userLoggedIn ? (
            <>
              <div className="flex">
              <Link to="/profile" className="text-2xl text-gray-700 pr-2">
                <FaUser 
                 data-tooltip-id="profile-tooltip"
                 data-tooltip-content="Profile" />
              </Link>
              <Tooltip
                  id="profile-tooltip"
                  place="bottom"
                  className="bg-gray-700 text-white text-xs rounded p-2"
                />
              </div>
              {/* Tooltip with FaHeart (Favorites) icon */}
              <div className="flex">
                <Link to="/favourite" className="text-2xl text-gray-700 pr-2">
                  <FaHeart
                    data-tooltip-id="fav-tooltip"
                    data-tooltip-content="Favourites"
                  />
                </Link>
                <Tooltip
                  id="fav-tooltip"
                  place="bottom"
                  className="bg-gray-700 text-white text-xs rounded p-2"
                />
              </div>
              <button
                onClick={handleLogoutClick}
                className="px-2 py-1 bg-white text-black border border-black hover:bg-black transition hover:text-white font-medium rounded-3xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <motion.div
                variants={buttonAnimation}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/login"
                  className="px-2 py-1 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div
                variants={buttonAnimation}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/signup"
                  className="px-2 py-1 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
                >
                  Signup
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <div className="fixed z-50 top-24 flex w-full justify-center items-center p-2 bg-blue-100 border-t border-b border-gray-300">
        <Link to="/apparels" className="nav-link">
          Apparels
        </Link>
        <Link to="/shoes" className="nav-link">
          Sneakers
        </Link>
        <Link to="/electronics" className="nav-link">
          Electronics
        </Link>
        <Link to="/accessories" className="nav-link">
          Accessories
        </Link>
        <Link to="/collectibles" className="nav-link">
          Collectibles
        </Link>
      </div>
    </div>
  );
};

export default NavbarTop;
