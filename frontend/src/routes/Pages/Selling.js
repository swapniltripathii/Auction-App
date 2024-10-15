import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../contexts/authContext/authcontext";
import ProfileLayout from "../../components/ProfileLayouts";
import { getAuth } from "firebase/auth";

const Selling = () => {
  const { currentUser } = useAuth();
  const [listings, setListings] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    if (currentUser) {
      const productsCollection = collection(db, "products");
      const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
        const userId = auth.currentUser.uid;
        const userProducts = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((product) => product.userId === userId);
        setListings(userProducts);
      });

      return () => unsubscribe();
    }
  }, [db, auth.currentUser, currentUser]);

  const handleDelete = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      setListings((prevListings) =>
        prevListings.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="h-full w-full bg-white">
      <ProfileLayout>
        <div className="p-6 bg-white">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            My Listings
          </h1>
          {listings.length === 0 ? (
            <p>No listings available.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {listings.map((listing) => (
                <li
                  key={listing.id}
                  className="border bg-white text-black border-gray-300 rounded-lg p-2 text-sm shadow-md"
                >
                  <h3 className="text-lg font-semibold truncate">
                    {listing.name}
                  </h3>
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="w-1/2 my-2 mx-auto"
                  />
                  <p className="text-gray-600">Category: {listing.category}</p>
                  <p className="text-gray-600">Price: ${listing.price}</p>
                  <p className="text-gray-600">
                    Status: {listing.isVerified ? "Verified" : "Unverified"}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ProfileLayout>
    </div>
  );
};

export default Selling;
