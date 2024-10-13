import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext/authcontext";
import { getAuth, updatePassword } from "firebase/auth";
import ProfileLayout from "../../components/ProfileLayouts";
import Footer from "../../components/Footer";

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
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">
        <ProfileLayout>
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

              {/* Name, Email, Username, Reset Password */}
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
                  <p className="text-gray-500">{userData.uid}</p>{" "}
                  {/* Display UID */}
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
        </ProfileLayout>
      </div>
    </div>
  );
};

export default Profile;
