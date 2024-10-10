import React from "react";
import { Link } from "react-router-dom";
import "./NavbarBottom.css"; // Import your custom CSS file if you create one
import appLogo from '../../assets/images/applogo.png';
import { useAuth } from "../../contexts/authContext/authcontext"; // Correct path to authcontext

const NavbarTop = () => {
  const { userLoggedIn, handleLogout } = useAuth(); // Use the auth context

  return (
    <div>
      {/* Top Navbar */}
      <div className="fixed w-screen flex justify-between items-center h-24 p-8 shadow-md z-10 border-b bg-white">
        <div className="flex items-center">
          <img
            src={appLogo}
            alt="BidRare Logo"
            className="h-24 w-50"
          />
        </div>
        <div className="flex-grow py-6 px-12 ml-2 mr-4">
          <input
            type="text"
            placeholder="Search for brand, color, etc."
            className="w-full p-3 border px-10 bg-gray-100 border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/about" className="text-gray-900 px-2 text-lg font-medium">
            About
          </Link>
          <Link to="/help" className="text-gray-900 px-3 text-lg font-medium">
            Help
          </Link>
          <Link to="/sell" className="text-gray-900 px-3 text-lg font-medium">
            Sell
          </Link>

          {/* Conditionally render buttons based on authentication */}
          {userLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      <div className="fixed top-24 flex w-full justify-center items-center p-2 bg-gray-100 border-t border-b border-gray-300">
        <Link to="/apparels" className="nav-link">
          Apparels
        </Link>
        <Link to="/sneakers" className="nav-link">
          Sneakers
        </Link>
        <Link to="/collectibles" className="nav-link">
          Collectibles
        </Link>
      </div>
    </div>
  );
};

export default NavbarTop;
