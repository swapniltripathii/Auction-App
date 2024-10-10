import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import "./NavbarBottom.css"; // Import your custom CSS file if you create one


const NavbarTop = () => {
  return (
    <div>
      {/* Top Navbar */}
      <div className="fixed w-screen flex justify-between items-center h-24 p-8 border-b focus-within:border-gray-300">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1721058683727-263364bb815a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D"
            alt="StockX Logo"
            className="h-16 w-30"
          />
        </div>
        <div className="flex-grow py-6 px-12 ml-10 mr-4">
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
          {/* <Dropdown/> */}
          <Button />
        </div>
      </div>

      
      <div className="fixed top-24 flex w-full justify-center items-center p-2 bg-gray-100 border-t border-b border-gray-300">
        {/* <Link to="/" className="nav-link">
          Brands
        </Link> */}
        <Link to="/apparels" className="nav-link">
          Apparels
        </Link>
        {/* <Link to="/women" className="nav-link">
          Women
        </Link>
        <Link to="/kids" className="nav-link">
          Kids
        </Link> */}
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
