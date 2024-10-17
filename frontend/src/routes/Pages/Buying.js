import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext/authcontext";
import { getAuth, updatePassword } from "firebase/auth";
import ProfileLayout from "../../components/ProfileLayouts";

const Buying = () => {
  const { currentUser } = useAuth(); // get the logged-in user's details
  
  

  return (
    <div className="h-full w-full bg-white">
      <ProfileLayout>
        <div className="p-6 bg-white">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Buying</h1>

          Main Content 
        </div>
      </ProfileLayout>
    </div>
  );
};

export default Buying;
