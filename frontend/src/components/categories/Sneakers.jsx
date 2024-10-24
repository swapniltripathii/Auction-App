import React, { useEffect, useState } from "react";
import Card from "../Card"; // Import your Card component
import { collection, getDocs, getFirestore } from "firebase/firestore"; // Ensure Firestore is imported
import Loader from "../Loader"; // Import the Loader component

const Sneakers = ({ limit }) => {
  const [sneakerProducts, setSneakerProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchSneakerProducts = async () => {
      try {
        const sneakersCollection = collection(db, "sneakers"); // Use Firestore instance
        const sneakersSnapshot = await getDocs(sneakersCollection);
        const sneakersList = sneakersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSneakerProducts(sneakersList);
      } catch (error) {
        console.error("Error fetching sneakers:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchSneakerProducts();
  }, [db]);

  // Render loader if loading is still true
  if (loading) {
    return <Loader />; // Show the loader without wrapping it in a div
  }

  // Render "No Sneakers Left" message if no products are found after loading
  if (sneakerProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        {/* Centering text horizontally and vertically */}
        <h1 className="text-center text-4xl font-bold text-gray-700">
          No Sneakers Left
        </h1>{" "}
        {/* Centered and large text */}
      </div>
    );
  }

  // If limit is provided, slice the sneakerProducts array to limit the displayed products
  const displayedProducts = limit
    ? sneakerProducts.slice(0, limit * 6)
    : sneakerProducts;

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

export default Sneakers;
