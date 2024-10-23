import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext/authcontext";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import ProfileLayout from "../../components/ProfileLayouts";
import Footer from "../../components/Footer";

const Buying = () => {
  const { currentUser } = useAuth();
  const [bids, setBids] = useState([]);
  const [orders, setOrders] = useState([]);
  const [history, setHistory] = useState([]);
  const [highestBids, setHighestBids] = useState({});
  const [filteredTab, setFilteredTab] = useState("bids");

  const db = getFirestore();

  useEffect(() => {
    const bidsCollection = collection(db, "bids");
    const ordersCollection = collection(db, "orders");

    // Fetching bids
    const unsubscribeBids = onSnapshot(bidsCollection, (snapshot) => {
      const userBids = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          let expiryDate;

          if (typeof data.expiryDate === "string") {
            expiryDate = new Date(
              data.expiryDate.replace(/ at /, " ").replace(/ UTC.*$/, "Z")
            );
          } else if (data.expiryDate instanceof Date) {
            expiryDate = data.expiryDate;
          } else {
            expiryDate = data.expiryDate.toDate();
          }

          return {
            id: doc.id,
            productName: data.productName,
            productImage: data.productImage,
            yourBidPrice: data.yourBidPrice,
            highestBid: data.highestBid,
            price: data.price,
            expiryDate: expiryDate,
            userId: data.bidderId,
            productId: data.productId,
            isSold: data.isSold, // Add isSold status
          };
        })
        .filter((bid) => bid.userId === currentUser.uid && !bid.isSold); // Filter out sold products

      setBids(userBids); // Set bids in the state

      // Fetch highest bids for all products related to current user bids
      fetchHighestBids(userBids);
    });

    // Fetching orders
    const unsubscribeOrders = onSnapshot(ordersCollection, (snapshot) => {
      const userOrders = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((order) => order.bidderId === currentUser.uid); // Use userId for orders
      setOrders(userOrders);
      setHistory(userOrders.filter((order) => order.status === "delivered"));
    });

    return () => {
      unsubscribeBids();
      unsubscribeOrders();
    };
  }, [db, currentUser.uid]);

  const fetchHighestBids = async (userBids) => {
    const bidsCollection = collection(db, "bids");

    const highestBidsPromises = userBids.map(async (bid) => {
      const bidsSnapshot = await getDocs(bidsCollection);
      const productBids = bidsSnapshot.docs
        .map((doc) => doc.data())
        .filter((bidData) => bidData.productId === bid.productId);

      if (productBids.length === 0) return { [bid.productId]: 0 };

      const highestBid = Math.max(...productBids.map((b) => b.yourBidPrice));
      return { [bid.productId]: highestBid };
    });

    const highestBidsArray = await Promise.all(highestBidsPromises);
    const highestBidsMap = Object.assign({}, ...highestBidsArray);
    setHighestBids(highestBidsMap); // Update state with highest bids for each product
  };

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

  const calculateRemainingDays = (expiryDate) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);

    if (isNaN(expirationDate.getTime())) {
      console.error(`Invalid date: ${expiryDate}`);
      return "Invalid date";
    }

    const differenceInTime = expirationDate - currentDate;
    if (differenceInTime <= 0) return "Expired";

    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    return `${differenceInDays} days left`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="overflow-x-auto h-full w-full bg-white">
      <ProfileLayout>
        <div className="p-4 md:p-6 bg-white">
          <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
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
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left text-sm md:text-base">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Item</th>
                    <th className="px-2 py-2">Your Bid Price</th>
                    <th className="px-2 py-2">Highest Bid</th>
                    <th className="px-2 py-2">Price</th>
                    <th className="px-2 py-2">Expires</th>
                    <th className="px-2 py-2">Delete</th>
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
                            className="w-12 h-12 md:w-14 md:h-14 object-cover mr-4"
                          />
                          {bid.productName.length > 20
                            ? `${bid.productName.slice(0, 20)}...`
                            : bid.productName}
                        </td>
                        <td className="border px-2 py-1">
                          ${bid.yourBidPrice}
                        </td>
                        <td className="border px-2 py-1">
                          ${highestBids[bid.productId] || "Loading..."}
                        </td>
                        <td className="border px-2 py-1">${bid.price}</td>
                        <td className="border px-2 py-1">
                          {calculateRemainingDays(bid.expiryDate)}
                        </td>
                        <td className="border px-2 py-1">
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
            </div>
          )}

          {filteredTab === "orders" && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left text-sm md:text-base">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Item</th>
                    <th className="px-2 py-2">Purchase Date</th>
                    <th className="px-2 py-2">Order No</th>
                    <th className="px-2 py-2">Price</th>
                    <th className="px-2 py-2">Status</th>
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
                            className="w-12 h-12 md:w-14 md:h-14 object-cover mr-4"
                          />
                          {order.productName.length > 20
                            ? `${order.productName.slice(0, 20)}...`
                            : order.productName}
                        </td>
                        <td className="border px-2 py-1">
                          {formatDate(order.purchaseDate)}
                        </td>
                        <td className="border px-2 py-1">{order.id}</td>
                        <td className="border px-2 py-1">${order.price}</td>
                        <td className="border px-2 py-1">{order.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {filteredTab === "history" && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left text-sm md:text-base">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Item</th>
                    <th className="px-2 py-2">Purchase Date</th>
                    <th className="px-2 py-2">Order No</th>
                    <th className="px-2 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No purchase history available.
                      </td>
                    </tr>
                  ) : (
                    history.map((order) => (
                      <tr key={order.id}>
                        <td className="border px-2 py-1 flex items-center">
                          <img
                            src={order.productImage}
                            alt={order.productName}
                            className="w-12 h-12 md:w-14 md:h-14 object-cover mr-4"
                          />
                          {order.productName.length > 20
                            ? `${order.productName.slice(0, 20)}...`
                            : order.productName}
                        </td>
                        <td className="border px-2 py-1">
                          {formatDate(order.purchaseDate)}
                        </td>
                        <td className="border px-2 py-1">{order.id}</td>
                        <td className="border px-2 py-1">${order.price}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </ProfileLayout>
      <Footer />
    </div>
  );
};

export default Buying;
