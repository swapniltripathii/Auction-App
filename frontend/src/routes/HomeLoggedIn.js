import React, { useEffect, useState } from "react";
import NavbarTop from "../components/shared/NavbarTop";
import { useAuth } from "../contexts/authContext/authcontext"; // Import useAuth to access the context
import Apparels from "../components/categories/Apparels";
import Collectibles from "../components/categories/Collectibles";
import Sneakers from "../components/categories/Sneakers";
import axios from "axios";
const HomeLoggedIn = () => {
  const { currentUser } = useAuth(); // Destructure currentUser from the auth context
  const [listings, setListings] = useState([]);

  // Fetch product listings when the component mounts
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth/listings");
        setListings(response.data); // Set the fetched listings data
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="w-full h-full">
      {/* Navbar */}
      <div className="w-full h-32">
        <NavbarTop />
      </div>

      {/* Home content */}
      <div className="w-full p-4">
        <h1 className="text-white text-2xl">Welcome, {currentUser?.email || 'User'}!</h1>

        {/* Product Listings Grid */}
        <div>
          <Apparels/>
          <Collectibles/>
          <Sneakers/>
        </div>
      </div>
    </div>
  );
};

export default HomeLoggedIn;
