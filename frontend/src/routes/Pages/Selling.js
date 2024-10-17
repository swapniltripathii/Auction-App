import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../contexts/authContext/authcontext";
import ProfileLayout from "../../components/ProfileLayouts";
import { getAuth } from "firebase/auth";

const Selling = () => {
  const { currentUser } = useAuth();
  const [listings, setListings] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("current");
  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status") || "current";
    setFilteredStatus(status);
  }, [location]);

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

  const handleSell = async (id, highestBid) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        isSold: true,
        verified: false, // Move to pending
        salePrice: highestBid,
        saleDate: new Date().toISOString(), // Mark the sale date
      });
      setListings((prevListings) =>
        prevListings.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const filterListingsByStatus = (status) => {
    switch (status) {
      case "pending":
        return listings.filter(
          (listing) => !listing.verified && listing.isSold
        );
      case "history":
        return listings.filter((listing) => listing.isSold);
      default:
        return listings.filter(
          (listing) => listing.verified && !listing.isSold
        );
    }
  };

  const handleTabChange = (status) => {
    navigate(`/selling?status=${status}`);
  };

  const filteredListings = filterListingsByStatus(filteredStatus);

  return (
    <div className="h-full w-full bg-white">
      <ProfileLayout>
        <div className="p-6 bg-white">
          <div className="flex space-x-6 mb-6">
            <button
              className={`px-4 text-lg font-semibold py-2 ${
                filteredStatus === "current"
                  ? "border-b-2 border-green-500"
                  : ""
              }`}
              onClick={() => handleTabChange("current")}
            >
              Current
            </button>
            <button
              className={`px-4 text-lg font-semibold py-2 ${
                filteredStatus === "pending"
                  ? "border-b-2 border-green-500"
                  : ""
              }`}
              onClick={() => handleTabChange("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 text-lg font-semibold py-2 ${
                filteredStatus === "history"
                  ? "border-b-2 border-green-500"
                  : ""
              }`}
              onClick={() => handleTabChange("history")}
            >
              History
            </button>
          </div>

          {filteredStatus === "current" && (
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Ask Price</th>
                  <th className="px-4 py-2">Highest Bid</th>
                  <th className="px-4 py-2">Sell</th>
                  <th className="px-4 py-2">Expires</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No listings available under current.
                    </td>
                  </tr>
                ) : (
                  filteredListings.map((listing) => (
                    <tr key={listing.id}>
                      <td className="border px-2 py-1 flex items-center">
                        <img
                          src={listing.imageUrl}
                          alt={listing.name}
                          className="w-14 h-14 object-cover mr-4"
                        />
                        {listing.name}
                      </td>
                      <td className="border px-4 py-2">${listing.price}</td>
                      <td className="border px-4 py-2">
                        ${listing.highestBid}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() =>
                            handleSell(listing.id, listing.highestBid)
                          }
                          className="bg-white border border-black rounded-full text-md font-semibold text-blue-600 px-3 py-1 rounded"
                        >
                          Sell
                        </button>
                      </td>
                      <td className="border px-4 py-2">
                        {Math.ceil(
                          (new Date(listing.expiryDate) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {filteredStatus === "pending" && (
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Sale Date</th>
                  <th className="px-4 py-2">Ship By</th>
                  <th className="px-4 py-2">Sale Price</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No listings available under pending.
                    </td>
                  </tr>
                ) : (
                  filteredListings.map((listing) => (
                    <tr key={listing.id}>
                      <td className="border px-4 py-2">{listing.name}</td>
                      <td className="border px-4 py-2">{listing.saleDate}</td>
                      <td className="border px-4 py-2">{listing.shipBy}</td>
                      <td className="border px-4 py-2">
                        ${listing.salePrice}
                      </td>
                      <td className="border px-4 py-2">
                        {listing.shippingStatus
                          ? "Delivered"
                          : "Not Delivered"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </ProfileLayout>
    </div>
  );
};

export default Selling;
