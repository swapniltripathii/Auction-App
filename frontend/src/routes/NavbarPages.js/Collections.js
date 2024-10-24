import React, { useEffect, useState } from "react";
import NavbarTop from "../../components/shared/NavbarTop";
import { useAuth } from "../../contexts/authContext/authcontext";
import Collectibles from "../../components/categories/Collectibles";

const Collections = () => {
  const { currentUser } = useAuth(); 

  return (
    <div className="w-full h-full">
      <div className="w-full h-32">
        <NavbarTop />
      </div>
      {/* Home content */}
      <div className="w-full h-full p-4 bg-gray-200 overflow">
        <h1 className="text-black text-2xl">
          Welcome, {currentUser?.email || "User"}!
        </h1>
        <div className="pl-8 pr-8">
          <Collectibles/>
        </div>
      </div>
    </div>
  );
};

export default Collections;
