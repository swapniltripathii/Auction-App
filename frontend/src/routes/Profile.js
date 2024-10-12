import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext/authcontext";
import { getAuth, updatePassword } from "firebase/auth";
import NavbarTop from "../components/shared/NavbarTop";
import {
  FaUser,
  FaShoppingCart,
  FaMoneyBill,
  FaHeart,
  FaWallet,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
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

  const handleResetPassword = async () => {
    try {
      const auth = getAuth();
      await updatePassword(auth.currentUser, "newPassword"); // Placeholder password
      alert("Password reset successfully.");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-32">
        <NavbarTop />
      </div>
      <div className="h-5/6 w-full mt-3 flex overflow-auto">
        <div className="h-full w-1/5 bg-gray-100 ">
          <div className="text-black font-normal text-2xl mt-4 ml-3 ">
            {userData.displayName}
          </div>
          <div className="flex flex-col items-start space-y-4 pl-4 pt-6 bg-gray-100">
            {/* Profile */}
            <div className="flex items-center space-x-4">
              <FaUser className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Profile</span>
                <span className="text-sm text-gray-500">
                  Shipping, Email, Password
                </span>
              </div>
            </div>
            <div className="w-full border-t border-gray-300"></div>
            {/* Buying */}
            <div className="flex items-center space-x-4">
              <FaShoppingCart className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Buying</span>
                <span className="text-sm text-gray-500">
                  Active Bids, Orders
                </span>
              </div>
            </div>
            <div className="w-full border-t border-gray-300"></div>
            {/* Selling */}
            <div className="flex items-center space-x-4">
              <FaMoneyBill className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Selling</span>
                <span className="text-sm text-gray-500">
                  Asks, Sales, Profile
                </span>
              </div>
            </div>
            <div className="w-full border-t border-gray-300"></div>
            {/* Favorites */}
            <div className="flex items-center space-x-4">
              <FaHeart className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">
                  Favorites
                </span>
                <span className="text-sm text-gray-500">Saved Items</span>
              </div>
            </div>
            {/* Divider */}
            <div className="w-full border-t border-gray-300"></div>

            {/* Wallet */}
            <div className="flex items-center space-x-4">
              <FaWallet className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Wallet</span>
                <span className="text-sm text-gray-500">
                  Payments, Payouts, Gift Cards
                </span>
              </div>
            </div>
            <div className="w-full border-t border-gray-300"></div>
            {/* Settings */}
            <div className="flex items-center space-x-4">
              <FaCog className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">
                  Settings
                </span>
                <span className="text-sm text-gray-500">
                  Security and Notifications
                </span>
              </div>
            </div>
            <div className="w-full border-t border-gray-300"></div>
            {/* Log Out */}
            <div className="flex items-center space-x-4">
              <FaSignOutAlt className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Log Out</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-4/5 bg-white ">
          <div className="p-6 bg-white">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Profile
            </h1>

            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-700 mb-4">
                Personal Information
              </h2>
              <hr className="border-gray-300 mb-4" />

              {/* Name, Shoe Size, Email, Username, Reset Password */}
              <div className="flex space-x-96 mb-4">
                <div>
                  <span className="text-gray-700 font-medium">Name</span>
                  <div className="text-gray-700">{userData.displayName}</div>
                </div>
                <div>
                  <span className="text-gray-700 font-medium">
                    Email Address
                  </span>
                  <div className="text-gray-700">{userData.email}</div>
                </div>
              </div>

              {/* UID and Reset Password */}
              <div className="flex space-x-56 mt-8">
                <div>
                  <span className="text-gray-700 font-medium">User ID</span>
                  <p className="text-gray-500">{userData.uid}</p> {/* Display UID */}
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium pl-3">
                    Reset Password
                  </span>
                  <button
                    onClick={handleResetPassword}
                    className="bg-black text-white px-4 py-2 m-3 text-xs rounded-full hover:bg-gray-800"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>

            {/* Shipping Information Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                  Shipping Info
                </h2>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 mb-4 rounded-full hover:bg-gray-200">
                  Edit
                </button>
              </div>
              <hr className="border-gray-300 mb-4" />

              {/* Shipping Info Content */}
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  You do not have any shipping information on file.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
