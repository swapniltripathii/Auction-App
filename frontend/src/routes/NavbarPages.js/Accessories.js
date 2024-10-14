import React, { useEffect, useState } from "react";
import NavbarTop from "../../components/shared/NavbarTop";
import { useAuth } from "../../contexts/authContext/authcontext";
import Accessory from "../../components/categories/Accessory";

const Accessories = () => {
  const { currentUser } = useAuth();

  return (
    <div className="w-full h-full">
      <div className="w-full h-32">
        <NavbarTop />
      </div>
      {/* Home content */}
      <div className=" w-full h-full overflow p-4 bg-gray-200 ">
        <h1 className="text-black text-2xl">
          Welcome, {currentUser?.email || "User"}!
        </h1>
        <div className="pl-8 pr-8">
          <Accessory />
        </div>
      </div>
    </div>
  );
};

export default Accessories;
