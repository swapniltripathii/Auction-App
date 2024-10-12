import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext/authcontext";
import { getAuth, updatePassword } from "firebase/auth";

const Profile = () => {
  const { currentUser } = useAuth(); // get the logged-in user's details
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        displayName: currentUser.displayName || "Name not set",
        email: currentUser.email,
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
    <div className="flex flex-col w-full h-screen items-center justify-center bg-black">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-3xl font-semibold text-black">Profile</div>
        <div className="border-t border-gray-300 pt-4 space-y-4">
          {/* Personal Information */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium">Name</div>
              <button className="px-3 py-1 text-sm text-gray-600 border rounded-md">
                Edit
              </button>
            </div>
            <div className="text-gray-700">{userData.displayName}</div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium">Email Address</div>
              <button className="px-3 py-1 text-sm text-gray-600 border rounded-md">
                Edit
              </button>
            </div>
            <div className="text-gray-700">{userData.email}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-lg font-medium">Reset Password</div>
            <button
              onClick={handleResetPassword}
              className="px-4 py-2 text-sm text-white bg-black rounded-md"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
