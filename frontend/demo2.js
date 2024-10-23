import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, addDoc, collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../contexts/authContext/authcontext";
import logo from "../../assets/images/logowhite.png";
import PaymentMethodModal from "../../components/Modals/PaymentMethodModal";

const BidNow = () => {
  const { productId } = useParams();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidPrice, setBidPrice] = useState(""); // Changed initial value to empty string
  const [bidExpiration, setBidExpiration] = useState(1);
  const [bidCount, setBidCount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showTotalDetails, setShowTotalDetails] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    uid: "",
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    if (currentUser) {
      setUserData({
        displayName: currentUser.displayName || "Name not set",
        email: currentUser.email,
        uid: currentUser.uid,
      });

      const db = getFirestore();
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

  const handleApplyDiscount = () => {
    if (discountCode === "DISCOUNT10") {
      setDiscount(10);
    } else if (discountCode === "DISCOUNT20") {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setIsModalOpen(false);
  };

  const handlePlaceBid = async (product) => {
    try {
      const db = getFirestore();
      const bidAmount = Number(bidPrice); // Ensure bidPrice is treated as a number

      if (!bidAmount || bidAmount < product.price * 0.8) {
        alert("Bid must be at least 80% of the product price.");
        return;
      }

      const newBid = {
        productName: product.name,
        productImage: product.imageUrl,
        yourBidPrice: bidAmount,
        expiryDate: new Date(Date.now() + bidExpiration * 86400000),
        userId: currentUser.uid,
      };

      await addDoc(collection(db, "bids"), newBid);
      alert("Bid placed successfully!");
      navigate("/bidding");
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  const shippingCost = 30;
  const processingCost = 10;
  const total = (bidPrice ? Number(bidPrice) : 0) + shippingCost + processingCost - discount; // Total calculation

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-blue-300 h-screen w-full overflow">
      <div className="h-24 w-full flex items-center justify-center bg-gray-800 text-white">
        <img src={logo} alt="Logo" className="h-32" />
      </div>

      <div className="flex justify-center p-5">
        <button
          className="bg-blue-400 text-black text-lg px-4 h-10 py-1 rounded-full mr-4"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <div className="flex flex-row justify-between items-start w-4/5 h-4/5 space-x-8 p-8 bg-gray-900 text-white rounded-xl shadow-2xl">
          <div className="w-1/2 flex justify-center p-10 bg-white rounded-lg items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-contain bg-white rounded-lg"
            />
          </div>

          <div className="w-1/2 flex flex-col p-5 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between bg-green-200 items-center">
              <h1 className="text-xl font-semibold">{product.name}</h1>
              <div className="text-lg bg-gray-700 p-2 rounded-lg">
                Bids: {bidCount}
              </div>
            </div>

            <div className="bg-gray-700 p-3 rounded-lg space-y-2">
              <h2 className="text-lg font-semibold">Place Bid</h2>
              <input
                type="number"
                min={product.price * 0.8}
                value={bidPrice}
                onChange={(e) => setBidPrice(e.target.value)} // Handle empty input
                placeholder={`Min: $${(product.price * 0.8).toFixed(2)}`}
                className="bg-gray-600 px-2 py-1 rounded w-full"
              />
            </div>

            <div className="bg-gray-700 p-4 flex justify-between item-center rounded-lg ">
              <label className="text-lg " htmlFor="expiration">
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

            <div className="bg-gray-700 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <p>Discount Code</p>
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="bg-gray-600 px-1 py-0.5 rounded w-2/5"
                />
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                onClick={handleApplyDiscount}
              >
                Apply
              </button>
            </div>

            <div className="bg-gray-700 p-4 flex justify-between item-center rounded-lg ">
              <div
                className="cursor-pointer"
                onClick={() => setShowTotalDetails(!showTotalDetails)}
              >
                <p>Total: ${total.toFixed(2)}</p>
                {showTotalDetails && (
                  <div className="bg-gray-600 text-gray-200 p-2 mt-2">
                    <p>Bid Price: ${bidPrice || "0"}</p>
                    <p>Shipping: ${shippingCost}</p>
                    <p>Processing: ${processingCost}</p>
                    <p>Discount: ${discount}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-700 p-4 flex justify-between item-center rounded-lg">
              <p>Payment Method</p>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                {paymentMethod || "Select"}
              </button>
            </div>

            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() => handlePlaceBid(product)}
              disabled={!bidPrice}
            >
              Place Bid
            </button>
          </div>
        </div>
      </div>

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handlePaymentSelect}
      />
    </div>
  );
};

export default BidNow;
