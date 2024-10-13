import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext/authcontext";
import { getAuth } from "firebase/auth";
import NavbarTop from "./shared/NavbarTop";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaMoneyBill,
  FaHeart,
  FaWallet,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const ProfileLayout = ({ children }) => {
  const { currentUser } = useAuth(); // get the logged-in user's details
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    uid: "", // Add uid to your userData state
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        displayName: currentUser.displayName || "Name not set",
        email: currentUser.email,
        uid: currentUser.uid, // Fetch the uid from currentUser
      });
    }
  }, [currentUser]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-32">
        <NavbarTop />
      </div>
      <div className="h-5/6 w-full mt-3 flex overflow-auto">
        {/* Sidebar */}
        <div className="h-full w-1/5 bg-gray-100">
          <div className="text-black font-normal text-2xl mt-4 ml-3">
            {/* Display user's name here */}
            {userData.displayName}
          </div>
          <div className="flex flex-col items-start space-y-4 pl-4 pt-6 bg-gray-100">
            {/* Profile */}
            <Link
              to="/profile"
              className="flex items-center space-x-4 hover:bg-white hover:text-gray-800 p-2 w-full rounded-md"
            >
              <FaUser className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Profile</span>
                <span className="text-sm text-gray-500">
                  Shipping, Email, Password
                </span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            {/* Buying */}
            <Link
              to="/buying"
              className="flex items-center space-x-4 hover:bg-white hover:text-gray-800 p-2 w-full rounded-md"
            >
              <FaShoppingCart className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Buying</span>
                <span className="text-sm text-gray-500">
                  Active Bids, Orders
                </span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            {/* Selling */}
            <Link
              to="/selling"
              className="flex items-center space-x-4 hover:bg-white hover:text-gray-800 p-2 w-full rounded-md"
            >
              <FaMoneyBill className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Selling</span>
                <span className="text-sm text-gray-500">Asks, Sales, Profile</span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            {/* Favorites */}
            <Link
              to="/favourites"
              className="flex items-center space-x-4 hover:bg-white hover:text-gray-800 p-2 w-full rounded-md"
            >
              <FaHeart className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Favorites</span>
                <span className="text-sm text-gray-500">Saved Items</span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            {/* Wallet */}
            <Link
              to="/wallet"
              className="flex items-center space-x-4 hover:bg-white hover:text-gray-800 p-2 w-full rounded-md"
            >
              <FaWallet className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Wallet</span>
                <span className="text-sm text-gray-500">
                  Payments, Payouts, Gift Cards
                </span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            {/* Settings */}
            <Link
              to="/settings"
              className="flex items-center space-x-4 hover:bg-white hover:text-gray-800 p-2 w-full rounded-md"
            >
              <FaCog className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Settings</span>
                <span className="text-sm text-gray-500">
                  Security and Notifications
                </span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            {/* Log Out */}
            <Link
              to="/logout"
              className="flex items-center space-x-4 hover:bg-white hover:text-gray-800 p-2 w-full rounded-md"
            >
              <FaSignOutAlt className="text-2xl text-gray-700" />
              <span className="block text-gray-700 font-medium">Log Out</span>
            </Link>
          </div>
        </div>

        {/* Main Section */}
        <div className="h-full w-4/5 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
