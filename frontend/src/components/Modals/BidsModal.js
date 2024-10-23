import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const BidsModal = ({ productId, isOpen, onClose }) => {
  const [bids, setBids] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    if (isOpen) {
      const fetchBids = async () => {
        try {
          const bidsCollection = collection(db, "bids");
          const bidsSnapshot = await getDocs(bidsCollection);
          const productBids = bidsSnapshot.docs
            .map((doc) => doc.data())
            .filter((bid) => bid.productId === productId)
            .sort((a, b) => b.yourBidPrice - a.yourBidPrice)
            .slice(0, 10); // Get top 10 bids

          setBids(productBids);
        } catch (error) {
          console.error("Error fetching bids:", error);
        }
      };

      fetchBids();
    }
  }, [isOpen, db, productId]);

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Top 10 Bids for Product</h2>
        <ul>
          {bids.length > 0 ? (
            bids.map((bid, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>Bid ${bid.yourBidPrice}</span>
                <span>
                  {bid.expiryDate
                    ? Math.ceil(
                        (new Date(bid.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
                      ) + " days left"
                    : "No expiry date"}
                </span>
              </li>
            ))
          ) : (
            <li>No bids available for this product.</li>
          )}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BidsModal;
