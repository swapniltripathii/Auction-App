import React from "react";
import NavbarTop from "../components/shared/NavbarTop";
import { useAuth } from "../contexts/authContext/authcontext"; // Import useAuth to access the context
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const HomeLoggedIn = () => {
  const { handleLogout } = useAuth(); // Destructure handleLogout from the auth context
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle logout and navigate back to login page
  const onLogout = async () => {
    await handleLogout(); // Call handleLogout from context
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="w-full h-full">
      {/* Navbar */}
      <div className="w-full h-32">
        <NavbarTop />
      </div>

      {/* Home content */}
      <div className="w-full bg-green-400">
        {/* Add a Logout Button */}
        <div className="p-4">
          <button
            onClick={onLogout} // Call onLogout when clicked
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeLoggedIn;
