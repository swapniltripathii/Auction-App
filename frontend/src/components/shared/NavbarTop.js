import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavbarBottom.css";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/authContext/authcontext";
import { FaUser } from "react-icons/fa";

const NavbarTop = () => {
  const { userLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate();

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
      <div className="fixed w-screen flex justify-between items-center h-24 p-8 bg-neutral-100 shadow-md z-10 border-b bg-white">
        <div className="flex items-center">
          <Link to="/home">
            <img src={logo} alt="BidRare Logo" className="h-24 w-50" />
          </Link>
        </div>
        <div className="flex-grow py-6 px-12  ml-2 mr-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 border px-10 bg-gray-100 border border-black rounded"
          />
        </div>
        <div className="flex items-center space-x-5">
          <Link to="/about" className="text-gray-900 px-2 text-xl font-medium">
            About
          </Link>
          <Link to="/help" className="text-gray-900 px-3 text-xl font-medium">
            Help
          </Link>
          <Link to="/sell" className="text-gray-900 px-3 text-xl font-medium">
            Sell
          </Link>

          {/* Conditionally render buttons based on authentication */}
          {userLoggedIn ? (
            <>
              <Link to="/profile" className="text-2xl text-gray-700 pr-2">
                <FaUser />
              </Link>
              <button
                onClick={handleLogoutClick} // Use the updated logout handler
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

      <div className="fixed top-24 flex w-full justify-center items-center p-2 bg-blue-100 border-t border-b border-gray-300">
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
    </div>
  );
};

export default NavbarTop;
