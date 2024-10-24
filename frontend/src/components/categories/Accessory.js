import React, { useEffect, useState } from "react";
import Card from "../Card"; // Import your Card component
import { collection, getDocs, getFirestore } from "firebase/firestore"; // Ensure Firestore is imported
import Loader from "../Loader"; // Import the Loader component

const Accessory = ({ limit }) => {
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchAccessoriesProducts = async () => {
      try {
        const accessoriesCollection = collection(db, "accessories"); // Use Firestore instance
        const accessoriesSnapshot = await getDocs(accessoriesCollection);
        const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccessoriesProducts(accessoriesList);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAccessoriesProducts();
  }, [db]);

  // Render loader if loading is still true
  if (loading) {
    return <Loader />; // Show the loader without wrapping it in a div
  }

  // Render "No Accessories Left" message if no products are found after loading
  if (accessoriesProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        {/* Centering text horizontally and vertically */}
        <h1 className="text-center text-4xl font-bold text-gray-700">
          No Accessories Left
        </h1>{" "}
        {/* Centered and large text */}
      </div>
    );
  }

  // If limit is provided, slice the accessoriesProducts array to limit the displayed products
  const displayedProducts = limit
    ? accessoriesProducts.slice(0, limit * 6)
    : accessoriesProducts;

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

export default Accessory;
