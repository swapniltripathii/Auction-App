import React from "react";
import NavbarTop from "../components/shared/NavbarTop";
import { useAuth } from "../contexts/authContext/authcontext"; // Import useAuth to access the context

const HomeLoggedIn = () => {
  const { currentUser } = useAuth(); // Destructure currentUser from the auth context

  return (
    <div className="w-full h-full">
      {/* Navbar */}
      <div className="w-full h-32">
        <NavbarTop />
      </div>

      {/* Home content */}
      <div className="w-full bg-green-400 p-4">
        {/* Content for logged-in users */}
        <h1 className="text-white text-2xl">Welcome, {currentUser?.email || 'User'}!</h1>
        {/* You can add more content here */}
      </div>
    </div>
  );
};

export default HomeLoggedIn;
