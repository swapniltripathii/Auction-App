import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavbarBottom.css";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/authContext/authcontext";
import { FaUser, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

// New container and item animation definitions
const container = {
  hidden: { opacity: 0.7, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0.01 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const NavbarTop = () => {
  const { userLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route

  // State to track whether the animation should play
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // useEffect to check if the current route is /home
  useEffect(() => {
    if (location.pathname === "/home") {
      setShouldAnimate(true); // Enable animation when on /home route
      const timeout = setTimeout(() => {
        setShouldAnimate(false); // Disable animation after it plays
      }, 1500); // Match the animation duration

      return () => clearTimeout(timeout); // Cleanup on unmount
    }
  }, [location.pathname]); // Re-run when the route changes

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
            {/* Conditionally animate the logo only on /home */}
            {shouldAnimate ? (
              <motion.div
                className="logo-container"
                variants={container} // Apply container animation
                initial="hidden"
                animate="visible"
              >
                <motion.img
                  src={logo}
                  alt="BidRare Logo"
                  className="h-24 w-50"
                  variants={item} // Apply item animation to the logo
                />
              </motion.div>
            ) : (
              <img src={logo} alt="BidRare Logo" className="h-24 w-50" />
            )}
          </Link>
        </div>
        <div className="flex-grow py-6 px-12 ml-2 mr-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 border px-10 bg-gray-100 border border-black rounded"
          />
        </div>
        <div className="flex items-center space-x-5">
          <Link to="/about" className="text-gray-900 px-1 text-xl font-medium">
            About
          </Link>
          <Link to="/admin" className="text-gray-900 px-1 text-xl font-medium">
            Help
          </Link>
          <Link to="/sell" className="text-gray-900 px-2 text-xl font-medium">
            Sell
          </Link>

          {/* Conditionally render buttons based on authentication */}
          {userLoggedIn ? (
            <>
              <Link to="/profile" className="text-2xl text-gray-700 pr-2">
                <FaUser />
              </Link>
              <Link to="/favourite" className="text-2xl text-gray-700 pr-2">
                <FaHeart />
              </Link>
              <button
                onClick={handleLogoutClick}
                className="px-2 py-1 bg-white text-black border border-black hover:bg-black transition hover:text-white font-medium rounded-3xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-2 py-1 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-2 py-1 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
              >
                Signup
              </Link>
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
