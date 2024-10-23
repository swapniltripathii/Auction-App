import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext/authcontext";
import { useLocation, Link } from "react-router-dom";
import NavbarTop from "./shared/NavbarTop";
import {
  FaUser,
  FaShoppingCart,
  FaMoneyBill,
  FaHeart,
  FaWallet,
  FaCog,
  FaSignOutAlt,
  FaTools,
} from "react-icons/fa";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ProfileLayout = ({ children }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    uid: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const db = getFirestore();

  useEffect(() => {
    if (currentUser) {
      setUserData({
        displayName: currentUser.displayName || "Name not set",
        email: currentUser.email,
        uid: currentUser.uid,
      });

      const fetchUserRole = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setIsAdmin(userData.role === "admin");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };

      fetchUserRole();
    }
  }, [currentUser, db]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full h-full">
      <div className="w-full h-32">
        <NavbarTop />
      </div>
      <div className="h-5/6 w-full mt-3 flex flex-col md:flex-row overflow-auto">
        <div className="w-full md:w-1/5 bg-gray-100">
          <div className="text-black font-normal text-xl md:text-2xl mt-4 ml-3">
            {userData.displayName}
          </div>
          <div className="flex flex-col items-start pt-6 bg-gray-100">
            <Link
              to="/profile"
              className={`flex items-center space-x-4 p-4 w-full rounded-md ${
                isActive("/profile") ? "bg-white" : "hover:bg-white"
              }`}
            >
              <FaUser className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Profile</span>
                <span className="text-sm text-gray-500">Shipping, Email, Password</span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            <Link
              to="/buying"
              className={`flex items-center space-x-4 p-4 w-full rounded-md ${
                isActive("/buying") ? "bg-white" : "hover:bg-white"
              }`}
            >
              <FaShoppingCart className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Buying</span>
                <span className="text-sm text-gray-500">Active Bids, Orders</span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            <Link
              to="/selling"
              className={`flex items-center space-x-4 p-4 w-full rounded-md ${
                isActive("/selling") ? "bg-white" : "hover:bg-white"
              }`}
            >
              <FaMoneyBill className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Selling</span>
                <span className="text-sm text-gray-500">Asks, Sales, Profile</span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            <Link
              to="/favourite"
              className={`flex items-center space-x-4 p-4 w-full rounded-md ${
                isActive("/favourite") ? "bg-white" : "hover:bg-white"
              }`}
            >
              <FaHeart className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Favorites</span>
                <span className="text-sm text-gray-500">Saved Items</span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            <Link
              to="/wallet"
              className={`flex items-center space-x-4 p-4 w-full rounded-md ${
                isActive("/wallet") ? "bg-white" : "hover:bg-white"
              }`}
            >
              <FaWallet className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Wallet</span>
                <span className="text-sm text-gray-500">Payments, Payouts, Gift Cards</span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            <Link
              to="/shipping"
              className={`flex items-center space-x-4 p-4 w-full rounded-md ${
                isActive("/shipping") ? "bg-white" : "hover:bg-white"
              }`}
            >
              <FaCog className="text-2xl text-gray-700" />
              <div>
                <span className="block text-gray-700 font-medium">Settings</span>
                <span className="text-sm text-gray-500">Security and Notifications</span>
              </div>
            </Link>

            <div className="w-full border-t border-gray-300"></div>

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className={`flex items-center space-x-4 p-4 w-full rounded-md ${
                    isActive("/admin") ? "bg-white" : "hover:bg-white"
                  }`}
                >
                  <FaTools className="text-2xl text-gray-700" />
                  <div>
                    <span className="block text-gray-700 font-medium">Admin</span>
                    <span className="text-sm text-gray-500">Admin Dashboard</span>
                  </div>
                </Link>

                <div className="w-full border-t border-gray-300"></div>
              </>
            )}
          </div>
        </div>

        <div className="h-full w-full md:w-4/5 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
