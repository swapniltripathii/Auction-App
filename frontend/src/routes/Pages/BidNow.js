import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../contexts/authContext/authcontext";
import logo from "../../assets/images/logowhite.png";
import PaymentMethodModal from "../../components/Modals/PaymentMethodModal";

const BidNow = () => {
  const { productId } = useParams();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidPrice, setBidPrice] = useState(0);
  const [bidExpiration, setBidExpiration] = useState(1);
  const [bidCount, setBidCount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showTotalDetails, setShowTotalDetails] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBidDetails, setShowBidDetails] = useState(false);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    uid: "",
  });
  const navigate = useNavigate();

  // Minimum bid is 75% of the product price
  const minimumBid = product ? product.price * 0.75 : 0;

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore();
        const collections = [
          "apparels",
          "collectibles",
          "sneakers",
          "accessories",
          "electronics",
        ];

        let productDoc = null;
        for (let collection of collections) {
          const docRef = doc(db, collection, productId);
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            productDoc = docSnapshot;
            break;
          }
        }

        if (productDoc) {
          setProduct(productDoc.data());
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch user's shipping info from Firestore
  useEffect(() => {
    if (currentUser) {
      setUserData({
        displayName: currentUser.displayName || "Name not set",
        email: currentUser.email,
        uid: currentUser.uid,
      });

      const db = getFirestore();
      // Fetch shipping information
      const shippingCollection = collection(db, "shippingInfo");
      const unsubscribe = onSnapshot(shippingCollection, (snapshot) => {
        const userShippingData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((info) => info.userId === currentUser.uid);

        setShippingInfo(userShippingData);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const [existingBid, setExistingBid] = useState(null);

// Fetch user's existing bid for the product
useEffect(() => {
  const fetchUserBid = async () => {
    if (currentUser && product) {
      const db = getFirestore();
      const bidsSnapshot = await getDocs(collection(db, "bids"));
      const userBid = bidsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .find((bid) => bid.productId === productId && bid.bidderId === currentUser.uid);

      setExistingBid(userBid);  // Set the user's existing bid (if any)
      if (userBid) {
        setBidPrice(userBid.yourBidPrice);  // Pre-fill bid price
      }
    }
  };

  fetchUserBid();
}, [currentUser, product, productId]);


  // Apply discount code
  const handleApplyDiscount = () => {
    if (discountCode === "DISCOUNT10") {
      setDiscount(10);
    } else if (discountCode === "DISCOUNT20") {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  // Handle payment method selection
  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setIsModalOpen(false);
  };

  const handlePlaceBid = async (product) => {
    try {
      const db = getFirestore();

      // Ensure the bid price is valid
      if (!bidPrice || bidPrice < product.price * 0.75) {
        alert("Bid must be at least 75% of the product price.");
        return;
      }

      // Fetch all bids for this product
      const bidsSnapshot = await getDocs(collection(db, "bids"));
      const bids = bidsSnapshot.docs
        .map((doc) => doc.data())
        .filter((bid) => bid.productId === productId);

      // Find the highest bid excluding the current user's bid
      const highestOtherBid = bids
        .filter((bid) => bid.userId !== currentUser.uid)
        .reduce((max, bid) => Math.max(max, bid.bidPrice), 0);

      // const sellerId = product.userId;

      const sellerId = product?.sellerId; // Ensure product is loaded and has userId
      console.log("Seller ID:", sellerId); // Log the sellerId to verify it's correct

      if (!sellerId) {
        alert("Seller ID is not defined. Cannot place bid.");
        return;
      }

      if (currentUser.uid === sellerId) {
        alert("You cannot bid on your own product.");
        return;
      }


      // Create a new bid object
      const newBid = {
        productName: product.name,
        productImage: product.imageUrl,
        yourBidPrice: totalBid.toFixed(2) || product.price,
        highestBid: highestOtherBid || 0,
        price: product.price,
        expiryDate: new Date(Date.now() + bidExpiration * 24 * 60 * 60 * 1000),
        bidderId: currentUser.uid,
        productId,
        sellerId: sellerId,
        isSold: false,
      };

      // Add the new bid to the Firestore "bids" collection
      await addDoc(collection(db, "bids"), newBid);
      alert("Bid placed successfully!");
      navigate("/buying");
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  const shippingCost = 20;
  const processingCost = 10;
  const totalBid =
    (Number(bidPrice) > 0 ? Number(bidPrice) : 0) +
    shippingCost +
    processingCost -
    discount;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className=" bg-blue-300 w-full h-full overflow-auto">
      <div className="h-24 w-full flex items-center justify-center bg-gray-800 text-white">
        <img src={logo} alt="Logo" className="h-32" />
      </div>

      {/* Product Card and Back Button Container */}
      <div className="flex justify-center p-5">
        <button
          className="bg-blue-400 text-black text-lg px-4 h-10 py-1 rounded-full mr-4"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        {/* Product Card */}
        <div className="flex flex-row justify-between items-start w-4/5 h-4/5 space-x-8 p-8 bg-gray-900 text-white rounded-xl shadow-2xl">
          {/* Left Side: Product Image */}
          <div className="w-1/2 flex justify-center p-10 bg-white rounded-lg items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-contain bg-white rounded-lg"
            />
          </div>

          {/* Right Side: Bid Now Panel */}
          <div className="w-1/2 flex flex-col p-5 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              {!showBidDetails ? (
                <>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">{product.name}</h1>
                    <div className="text-md bg-gray-700 p-1 m-2 rounded-lg">
                      Bids: {bidCount}
                    </div>
                  </div>
                </>
              ) : (
                <h2 className="text-2xl font-semibold">Review Order</h2>
              )}
            </div>
            {!showBidDetails ? (
              <>
                {/* Place Bid Section */}
                <div className="bg-gray-700 p-3 rounded-lg space-y-2">
                  <h2 className="text-lg font-semibold">Place Bid</h2>
                  <input
                    type="number"
                    min={product.price * 0.75}
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    placeholder={`Min: $${(product.price * 0.75).toFixed(2)}`}
                    className="bg-gray-600 px-2 py-1 rounded w-full"
                  />
                </div>

                {/* Bid Expiration Section */}
                <div className="bg-gray-700 p-4 flex justify-between item-center rounded-lg">
                  <label className="text-lg" htmlFor="expiration">
                    Bid Expiration
                  </label>
                  <select
                    id="expiration"
                    value={bidExpiration}
                    onChange={(e) => setBidExpiration(Number(e.target.value))}
                    className="bg-gray-600 px-2 py-1 rounded w-2/5"
                  >
                    {[1, 7, 14, 30].map((days) => (
                      <option key={days} value={days}>
                        {days} days
                      </option>
                    ))}
                  </select>
                </div>

                {/* Shipping Info Section */}
                <div className="bg-gray-700 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    {shippingInfo ? (
                      <p>
                        {shippingInfo.city}, {shippingInfo.state}
                      </p>
                    ) : (
                      <p>No shipping info available.</p>
                    )}
                    <button
                      className="text-blue-500"
                      onClick={() => navigate("/shipping")}
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Discount Code Section */}
                <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <p>Discount Code</p>
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter discount code"
                      className="bg-gray-600  px-1 py-1 rounded"
                    />
                    <button
                      className="text-blue-500"
                      onClick={handleApplyDiscount}
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && <p>Discount applied: ${discount}</p>}
                </div>

                {/* Payment Method Section */}
                <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <p>{paymentMethod || "Payment Method"}</p>
                    <button
                      className="text-blue-500"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {paymentMethod ? "Edit" : "Add"}
                    </button>
                  </div>
                </div>

                {/* Modal for selecting payment method */}
                {isModalOpen && (
                  <PaymentMethodModal
                    handlePaymentSelect={handlePaymentSelect}
                    closeModal={() => setIsModalOpen(false)}
                  />
                )}

                {/* Total Section */}
                <div className="flex justify-between items-center border-t border-gray-600 pt-3 relative">
                  <p className="text-xl font-semibold pl-2 ">Total</p>
                  <div className="flex items-center">
                    <div
                      className="text-xl font-bold cursor-pointer mr-2"
                      onClick={() => setShowTotalDetails(!showTotalDetails)}
                    >
                      ${totalBid.toFixed(2)}
                    </div>
                    <svg
                      className={`w-4 h-4 cursor-pointer transform transition-transform ${
                        showTotalDetails ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => setShowTotalDetails(!showTotalDetails)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  {showTotalDetails && (
                    <div className="absolute z-10 bottom-full left-0 w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg p-4 rounded-lg">
                      <div className="flex justify-between">
                        <p>Product Price:</p>
                        <p>${bidPrice || "0"}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Shipping:</p>
                        <p>${shippingCost}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Processing & Verification:</p>
                        <p>${processingCost}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Discount:</p>
                        <p>- ${discount}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Next Button */}
                <button
                  className={`bg-blue-400 text-black py-2 w-24 text-lg item-center justify-center rounded-3xl ${
                    bidPrice >= minimumBid
                      ? ""
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (bidPrice >= minimumBid) setShowBidDetails(true);
                  }}
                  disabled={bidPrice < minimumBid} // Disable if below minimum
                >
                  Next
                </button>
              </>
            ) : (
              <div>
                <div className="bg-gray-700 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <p>Your Purchase Price</p>
                    <p>${bidPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Processing & Verification:</p>
                    <p>${processingCost}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping:</p>
                    <p>${shippingCost}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Discount:</p>
                    <p>- ${discount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold text-xl">Total</p>
                    <p className="font-bold text-xl">${totalBid.toFixed(2)}</p>
                  </div>
                  <p className="text-gray-400 text-xs">
                    * Taxes are included in the price.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2 bg-gray-700 p-3 rounded-lg space-y-2">
                  <p>Shipping Address:</p>
                  <p>
                    {shippingInfo.city}, {shippingInfo.state}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    className="bg-black border border-white py-2 px-4 rounded-full mt-2 text-white"
                    onClick={() => setShowBidDetails(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-400 border border-black py-2 px-4 rounded-full mt-2 text-black"
                    onClick={() => handlePlaceBid(product)}
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidNow;
