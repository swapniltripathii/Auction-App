import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../contexts/authContext/authcontext";
import ProfileLayout from "../../components/ProfileLayouts";
import { getAuth } from "firebase/auth";
import Footer from "../../components/Footer";

const Selling = () => {
  const { currentUser } = useAuth();
  const [listings, setListings] = useState([]); // Store products
  const [orders, setOrders] = useState([]); // Store orders
  const [filteredTab, setFilteredTab] = useState("current");
  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status") || "current";
    setFilteredTab(status);
  }, [location]);

  const [highestBids, setHighestBids] = useState({});

  useEffect(() => {
    if (currentUser) {
      const sellerId = auth.currentUser.uid; // Updated to sellerId
      const productsCollection = collection(db, "products");
      const ordersCollection = collection(db, "orders");

      const unsubscribeProducts = onSnapshot(
        productsCollection,
        async (snapshot) => {
          const userProducts = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((product) => product.sellerId === sellerId); // Updated to filter by sellerId

          const bidsPromises = userProducts.map(async (product) => {
            const bidsCollection = collection(db, "bids");
            const bidsSnapshot = await getDocs(bidsCollection);
            const productBids = bidsSnapshot.docs
              .map((doc) => doc.data())
              .filter((bid) => bid.productId === product.id);

            const highestBid = productBids.length
              ? Math.max(...productBids.map((bid) => bid.yourBidPrice))
              : 0;

            return { [product.id]: highestBid };
          });

          const bidsData = await Promise.all(bidsPromises);
          const mergedBids = Object.assign({}, ...bidsData);

          setListings(userProducts);
          setHighestBids(mergedBids);
        }
      );

      const unsubscribeOrders = onSnapshot(ordersCollection, (snapshot) => {
        const userOrders = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((order) => order.sellerId === sellerId); // Updated to filter by sellerId

        setOrders(userOrders); // Update orders state
      });

      return () => {
        unsubscribeProducts();
        unsubscribeOrders();
      };
    }
  }, [db, auth.currentUser, currentUser]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleSell = async (id, highestBid) => {
    try {
      const productRef = doc(db, "products", id);
      const bidsCollection = collection(db, "bids");
      const ordersCollection = collection(db, "orders");

      const saleDate = new Date().toISOString();
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Fetch the product
      const productSnapshot = await getDoc(productRef);
      if (!productSnapshot.exists()) {
        console.error("Product does not exist");
        return;
      }
      const productData = { id, ...productSnapshot.data() };

      // Fetch all bids for this product
      const bidsSnapshot = await getDocs(
        query(bidsCollection, where("productId", "==", id))
      );
      const productBids = bidsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (productBids.length === 0) {
        console.error("No bids found for this product");
        return;
      }

      const highestBidder = productBids.find(
        (bid) => parseFloat(bid.yourBidPrice) === highestBid
      );
      if (!highestBidder) {
        console.error("No valid bidder found");
        return;
      }

      const newOrder = {
        ...productData,
        highestBid,
        saleDate,
        orderId,
        bidderId: highestBidder.bidderId,
        bids: productBids.map((bid) => ({
          id: bid.id,
          yourBidPrice: bid.yourBidPrice,
          bidderId: bid.bidderId,
        })),
        isSold: true,
        isDelivered: false,
      };

      // Add order to the seller's orders collection
      await addDoc(ordersCollection, newOrder);

      // Update product as sold
      await updateDoc(productRef, {
        isSold: true,
        salePrice: highestBid,
        saleDate,
        orderId,
      });

      // Move the product from the bidder's bids to their orders
      const bidderOrdersCollection = collection(
        db,
        "users",
        highestBidder.bidderId,
        "orders"
      );
      await addDoc(bidderOrdersCollection, { ...newOrder, status: "Pending" });

      // Update local state
      setListings((prevListings) =>
        prevListings.map((product) =>
          product.id === id ? { ...product, isSold: true, orderId } : product
        )
      );
    } catch (error) {
      console.error(
        "Error updating product and bids:",
        error.message,
        error.code
      );
    }
  };

  const handleTabChange = (tab) => {
    setFilteredTab(tab);
  };

  // Products displayed in the current tab are not sold yet (isSold: false)
  const currentListings = listings.filter((listing) => !listing.isSold);

  // Products displayed in the pending tab are sold but not delivered yet (isSold: true, isDelivered: false)
  const pendingListings = orders.filter((order) => !order.isDelivered);

  // Products displayed in the history tab are delivered (isDelivered: true)
  const historyListings = orders.filter((order) => order.isDelivered);

  return (
    <div className="h-full w-full bg-white">
      <ProfileLayout>
        <div className="p-6 bg-white">
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-6 mb-6">
            <button
              className={`px-4 text-lg font-semibold py-2 ${
                filteredTab === "current" ? "border-b-2 border-green-500" : ""
              }`}
              onClick={() => handleTabChange("current")}
            >
              Current
            </button>
            <button
              className={`px-4 text-lg font-semibold py-2 ${
                filteredTab === "pending" ? "border-b-2 border-green-500" : ""
              }`}
              onClick={() => handleTabChange("pending")}
            >
              Pending
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

          {/* Responsive Table for Current Listings */}
          {filteredTab === "current" && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="hidden sm:table-header-group">
                  <tr>
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Ask Price</th>
                    <th className="px-4 py-2">Highest Bid</th>
                    <th className="px-4 py-2">Sell</th>
                    <th className="px-4 py-2">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {currentListings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No current listings available.
                      </td>
                    </tr>
                  ) : (
                    currentListings.map((listing) => (
                      <tr key={listing.id} className="block sm:table-row">
                        <td className="border px-2 py-1 flex items-center">
                          <img
                            src={listing.imageUrl}
                            alt={listing.name}
                            className="w-14 h-14 object-cover mr-4"
                          />
                          {listing.name.length > 20
                            ? `${listing.name.slice(0, 20)}...`
                            : listing.name}
                        </td>
                        <td className="border px-4 py-2 sm:text-right">
                          ${listing.price}
                        </td>
                        <td className="border px-4 py-2 sm:text-right">
                          ${highestBids[listing.id] || 0}
                        </td>
                        <td className="border px-4 py-2 sm:text-center">
                          <button
                            onClick={() =>
                              handleSell(listing.id, highestBids[listing.id])
                            }
                            className="bg-white border border-black rounded-full text-md font-semibold text-blue-600 px-3 py-1"
                          >
                            Sell
                          </button>
                        </td>
                        <td className="border px-4 py-2 sm:text-right">
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
            </div>
          )}

          {/* Similarly, apply responsive styles for pending and history listings */}
          {filteredTab === "pending" && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="hidden sm:table-header-group">
                  <tr>
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Sale Date</th>
                    <th className="px-4 py-2">Order No</th>
                    <th className="px-4 py-2">Sale Price</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingListings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No pending listings available.
                      </td>
                    </tr>
                  ) : (
                    pendingListings.map((order) => (
                      <tr key={order.id} className="block sm:table-row">
                        <td className="border px-2 py-1 flex items-center">
                          <img
                            src={order.imageUrl}
                            alt={order.name}
                            className="w-14 h-14 object-cover mr-4"
                          />
                          {order.name.length > 20
                            ? `${order.name.slice(0, 20)}...`
                            : order.name}
                        </td>
                        <td className="border px-4 py-2">
                          {formatDate(order.saleDate)}
                        </td>
                        <td className="border px-4 py-2">{order.orderId}</td>
                        <td className="border px-4 py-2">
                          ${order.highestBid}
                        </td>
                        <td className="border px-4 py-2">Pending</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {filteredTab === "history" && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="hidden sm:table-header-group">
                  <tr>
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Sale Date</th>
                    <th className="px-4 py-2">Order No</th>
                    <th className="px-4 py-2">Sale Price</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historyListings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No history available.
                      </td>
                    </tr>
                  ) : (
                    historyListings.map((order) => (
                      <tr key={order.id} className="block sm:table-row">
                        <td className="border px-2 py-1 flex items-center">
                          <img
                            src={order.imageUrl}
                            alt={order.name}
                            className="w-14 h-14 object-cover mr-4"
                          />
                          {order.name.length > 20
                            ? `${order.name.slice(0, 20)}...`
                            : order.name}
                        </td>
                        <td className="border px-4 py-2">
                          {formatDate(order.saleDate)}
                        </td>
                        <td className="border px-4 py-2">{order.orderId}</td>
                        <td className="border px-4 py-2">${order.salePrice}</td>
                        <td className="border px-4 py-2">Delivered</td>
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

export default Selling;
