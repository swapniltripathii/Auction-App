import React, { useEffect, useState } from "react";
import Card from "../Card"; // Import your Card component
import { collection, getDocs, getFirestore } from "firebase/firestore"; // Import necessary Firestore functions
import Loader from "../Loader"; // Import the Loader component

const Collectibles = ({ limit }) => {
  const [collectibleProducts, setCollectibleProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchCollectibleProducts = async () => {
      try {
        const collectiblesCollection = collection(db, "collectibles"); // Use the db variable
        const collectiblesSnapshot = await getDocs(collectiblesCollection);
        const collectiblesList = collectiblesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollectibleProducts(collectiblesList);
      } catch (error) {
        console.error("Error fetching collectibles:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCollectibleProducts();
  }, [db]);

  // Render loader if loading is still true
  if (loading) {
    return <Loader />; // Show the loader without wrapping it in a div
  }

  // Render "No Collectibles Left" message if no products are found after loading
  if (collectibleProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        {/* Centering text horizontally and vertically */}
        <h1 className="text-center text-4xl font-bold text-gray-700">
          No Collectibles Left
        </h1>{" "}
        {/* Centered and large text */}
      </div>
    );
  }

  // If limit is provided, slice the collectibleProducts array to limit the displayed products
  const displayedProducts = limit
    ? collectibleProducts.slice(0, limit * 6)
    : collectibleProducts;

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

export default Collectibles;
