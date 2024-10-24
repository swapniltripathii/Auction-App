import React, { useEffect, useState } from "react";
import Card from "../Card"; // Import your Card component
import { collection, getDocs, getFirestore } from "firebase/firestore"; // Import necessary Firestore functions
import Loader from "../Loader"; // Import the Loader component

const Electron = ({ limit }) => {
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchElectronicsProducts = async () => {
      try {
        const electronicsCollection = collection(db, "electronics"); // Use Firestore instance
        const electronicsSnapshot = await getDocs(electronicsCollection);
        const electronicsList = electronicsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setElectronicsProducts(electronicsList);
      } catch (error) {
        console.error("Error fetching electronics:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchElectronicsProducts();
  }, [db]);

  // Render loader if loading is still true
  if (loading) {
    return <Loader />; // Show the loader without wrapping it in a div
  }

  // Render "No Electronics Left" message if no products are found after loading
  if (electronicsProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        {/* Centering text horizontally and vertically */}
        <h1 className="text-center text-4xl font-bold text-gray-700">
          No Electronics Left
        </h1>{" "}
        {/* Centered and large text */}
      </div>
    );
  }

  // If limit is provided, slice the electronicsProducts array to limit the displayed products
  const displayedProducts = limit
    ? electronicsProducts.slice(0, limit * 6)
    : electronicsProducts;

  // Render products once loaded
  return (
    <div className="product-container p-4">
      <div className="grid sm:grid-cols-6 gap-6">
        {displayedProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Electron;
