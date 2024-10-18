import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext/authcontext";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import ProfileLayout from "../../components/ProfileLayouts";

const Buying = () => {
  const { currentUser } = useAuth();
  const [bids, setBids] = useState([]);
  const [orders, setOrders] = useState([]);
  const [history, setHistory] = useState([]);
  const [filteredTab, setFilteredTab] = useState("bids");

  const db = getFirestore();

  useEffect(() => {
    const bidsCollection = collection(db, "bids");
    const ordersCollection = collection(db, "orders");

    // Fetching bids
    const unsubscribeBids = onSnapshot(bidsCollection, (snapshot) => {
      const userBids = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((bid) => bid.userId === currentUser.uid);
      setBids(userBids);
    });

    // Fetching orders
    const unsubscribeOrders = onSnapshot(ordersCollection, (snapshot) => {
      const userOrders = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((order) => order.userId === currentUser.uid);
      setOrders(userOrders);
      // Updating history
      setHistory(userOrders.filter((order) => order.status === "delivered"));
    });

    return () => {
      unsubscribeBids();
      unsubscribeOrders();
    };
  }, [db, currentUser.uid]);

  const handleDeleteBid = async (id) => {
    try {
      await deleteDoc(doc(db, "bids", id));
    } catch (error) {
      console.error("Error deleting bid:", error);
    }
  };

  const handleTabChange = (tab) => {
    setFilteredTab(tab);
  };

  return (
    <div className="h-full w-full bg-white">
      <ProfileLayout>
        <div className="p-6 bg-white">
          <div className="flex space-x-6 mb-6">
            <button
              className={`px-4 text-lg font-semibold py-2 ${
                filteredTab === "bids" ? "border-b-2 border-green-500" : ""
              }`}
              onClick={() => handleTabChange("bids")}
            >
              Bids
            </button>
            <button
              className={`px-4 text-lg font-semibold py-2 ${
                filteredTab === "orders" ? "border-b-2 border-green-500" : ""
              }`}
              onClick={() => handleTabChange("orders")}
            >
              Orders
            </button>
            <button
              className={`px-4 text-lg font-semibold py-2 ${
                filteredTab === "history" ? "border-b-2 border-green-500" : ""
              }`}
              onClick={() => handleTabChange("history")}
            >
              History
            </button>
          </div>

          {filteredTab === "bids" && (
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Your Bid Price</th>
                  <th className="px-4 py-2">Highest Bid</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Expires</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {bids.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No bids available.
                    </td>
                  </tr>
                ) : (
                  bids.map((bid) => (
                    <tr key={bid.id}>
                      <td className="border px-2 py-1 flex items-center">
                        <img
                          src={bid.productImage}
                          alt={bid.productName}
                          className="w-14 h-14 object-cover mr-4"
                        />
                        {bid.productName}
                      </td>
                      <td className="border px-4 py-2">${bid.yourBidPrice}</td>
                      <td className="border px-4 py-2">${bid.highestBid}</td>
                      <td className="border px-4 py-2">${bid.price}</td>
                      <td className="border px-4 py-2">
                        {Math.ceil(
                          (new Date(bid.expiryDate) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleDeleteBid(bid.id)}
                          className="text-red-600"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {filteredTab === "orders" && (
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Order No</th>
                  <th className="px-4 py-2">Purchase Date</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No orders available.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="border px-2 py-1 flex items-center">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="w-14 h-14 object-cover mr-4"
                        />
                        {order.productName}
                      </td>
                      <td className="border px-4 py-2">{order.orderNo}</td>
                      <td className="border px-4 py-2">{order.purchaseDate}</td>
                      <td className="border px-4 py-2">${order.price}</td>
                      <td className="border px-4 py-2">{order.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {filteredTab === "history" && (
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Order No</th>
                  <th className="px-4 py-2">Purchase Date</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No history available.
                    </td>
                  </tr>
                ) : (
                  history.map((order) => (
                    <tr key={order.id}>
                      <td className="border px-2 py-1 flex items-center">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="w-14 h-14 object-cover mr-4"
                        />
                        {order.productName}
                      </td>
                      <td className="border px-4 py-2">{order.orderNo}</td>
                      <td className="border px-4 py-2">{order.purchaseDate}</td>
                      <td className="border px-4 py-2">${order.price}</td>
                      <td className="border px-4 py-2">{order.status}</td>
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

export default Buying;
