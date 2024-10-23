import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Shipping() {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [userShippingId, setUserShippingId] = useState(null); // ID for the shipping info
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input changes
  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Submit or update shipping information
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;

    // Validate postal code and phone number
    if (shippingInfo.postalCode.length !== 6) {
      alert("Postal Code must be exactly 6 digits.");
      return;
    }
    if (shippingInfo.phoneNumber.length !== 10) {
      alert("Phone Number must be exactly 10 digits.");
      return;
    }

    if (userShippingId) {
      // Update existing shipping info
      const shippingRef = doc(db, "shippingInfo", userShippingId);
      await updateDoc(shippingRef, shippingInfo);
      navigate("/profile"); // Redirect to the /profile page after update
    } else {
      // Add new shipping info
      const docRef = await addDoc(collection(db, "shippingInfo"), {
        ...shippingInfo,
        userId,
      });
      setUserShippingId(docRef.id); // Save the document ID
      navigate("/profile"); // Redirect to the /profile page after addition
    }
  };

  // Fetch user's shipping info on component mount
  useEffect(() => {
    const userId = auth.currentUser.uid;
    const shippingCollection = collection(db, "shippingInfo");

    // Subscribe to user's shipping info
    const unsubscribe = onSnapshot(shippingCollection, (snapshot) => {
      const userShippingData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .find((info) => info.userId === userId);

      if (userShippingData) {
        setShippingInfo(userShippingData);
        setUserShippingId(userShippingData.id); // Set the document ID if exists
      }
    });

    return () => unsubscribe();
  }, [db, auth.currentUser.uid]);

  return (
    <div className="container mx-auto p-5 bg-blue-200 flex justify-center">
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-md"
        style={{
          width: "90%", // Use 90% width for better responsiveness
          maxWidth: "600px", // Set a max-width for larger screens
          height: "auto", // Auto height for better responsiveness
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {userShippingId ? "Update Shipping Info" : "Add Shipping Info"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-white font-medium">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={shippingInfo.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-white font-medium">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={shippingInfo.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Country Field */}
          <div className="mb-4">
            <label htmlFor="country" className="block text-white font-medium">
              Country
            </label>
            <input
              id="country"
              type="text"
              name="country"
              value={shippingInfo.country}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Address 1 Field */}
          <div className="mb-4">
            <label htmlFor="address1" className="block text-white font-medium">
              Address 1
            </label>
            <input
              id="address1"
              type="text"
              name="address1"
              value={shippingInfo.address1}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Address 2 Field */}
          <div className="mb-4">
            <label htmlFor="address2" className="block text-white font-medium">
              Address 2 (Optional)
            </label>
            <input
              id="address2"
              type="text"
              name="address2"
              value={shippingInfo.address2}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* City & State Fields */}
          <div className="mb-4 flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="city" className="block text-white font-medium">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="state" className="block text-white font-medium">
                State
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Postal Code & Phone Number Fields */}
          <div className="mb-4 flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="postalCode"
                className="block text-black font-medium"
              >
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleChange}
                required
                pattern="\d{6}" // Restrict to 6 digits
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="phoneNumber"
                className="block text-black font-medium"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={shippingInfo.phoneNumber}
                onChange={handleChange}
                required
                pattern="\d{10}" // Restrict to 10 digits
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/3 bg-black text-white py-2 rounded-lg"
            >
              {userShippingId ? "Update Info" : "Submit Info"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
