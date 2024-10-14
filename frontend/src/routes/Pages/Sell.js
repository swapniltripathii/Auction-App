import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs, // Add this line
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

export default function Sell() {
  const [activeTab, setActiveTab] = useState("newListing");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Changed to handle image URL
  const [category, setCategory] = useState("sneakers");
  const [price, setPrice] = useState("");
  const [listings, setListings] = useState([]);

  const db = getFirestore();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;

    try {
      await addDoc(collection(db, "products"), {
        userId,
        name: productName,
        description,
        category,
        price: parseFloat(price),
        imageUrl, // Now using imageUrl directly
        isVerified: false,
      });

      // Clear the form fields
      setProductName("");
      setDescription("");
      setCategory("sneakers");
      setPrice("");
      setImageUrl(""); // Reset the image URL
    } catch (error) {
      console.error("Error uploading the listing:", error);
    }
  };

  useEffect(() => {
    const productsCollection = collection(db, "products");
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const userId = auth.currentUser.uid; // Get the current user's ID
      const listingsData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((listing) => listing.userId === userId); // Filter to show only the user's listings
  
      console.log("Current user listings:", listingsData); // Log the filtered listings
      setListings(listingsData);
    });
  
    return () => unsubscribe();
  }, [db, auth.currentUser.uid]);
  

  const handleVerify = async (id, category) => {
    const userId = auth.currentUser.uid;
    const listingRef = doc(db, "products", id);
    const listingSnapshot = await getDoc(listingRef);

    if (listingSnapshot.exists()) {
      const listingData = listingSnapshot.data();

      // Check if the product belongs to the logged-in user
      if (listingData.userId === userId) {
        // Update the isVerified field in the original 'products' collection
        await updateDoc(listingRef, { isVerified: true });

        // Create a reference to the category-specific collection (e.g., 'sneakers')
        const categoryRef = collection(db, category);

        // Add the listing to the category-specific collection with isVerified set to true
        await addDoc(categoryRef, {
          ...listingData,
          isVerified: true,
        });

        console.log("Product verified and moved to category collection.");
      } else {
        console.error("You can only verify your own listings.");
      }
    }
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete product with ID:", id); // Log ID being deleted
    const listingRef = doc(db, "products", id);
    const listingSnapshot = await getDoc(listingRef);
  
    if (listingSnapshot.exists()) {
      const listingData = listingSnapshot.data();
      const category = listingData.category;
  
      try {
        // 1. Delete from 'products' collection
        await deleteDoc(listingRef);
        console.log("Deleted from products collection");
  
        // 2. Delete from the corresponding category-specific collection
        const categoryCollectionRef = collection(db, category);
        const querySnapshot = await getDocs(categoryCollectionRef);
  
        // Find the document in the category collection that matches the product ID
        const categoryDoc = querySnapshot.docs.find(
          (doc) => doc.data().userId === listingData.userId && doc.data().name === listingData.name
        );
  
        if (categoryDoc) {
          await deleteDoc(doc(db, category, categoryDoc.id));
          console.log("Deleted from category collection");
        } else {
          console.warn("Category document not found for deletion");
        }
  
        // 3. Update the local state to remove the deleted listing
        setListings((prevListings) =>
          prevListings.filter((listing) => listing.id !== id)
        );
  
        console.log("Product deleted from both collections.");
      } catch (error) {
        console.error("Error deleting the product:", error);
      }
    } else {
      console.error("Product not found in the 'products' collection.");
    }
  };
  

  return (
    <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side - New Listing */}
      <div className="bg-gray-300 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4"> New Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="product-name"
              className="block text-black font-medium"
            >
              Product Name
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-black font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-black font-medium">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="sneakers">Sneakers</option>
              <option value="apparels">Apparels</option>
              <option value="collectibles">Collectibles</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-black font-medium">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image-url" className="block text-black font-medium">
              Image URL
            </label>
            <input
              id="image-url"
              type="text"
              placeholder="Enter Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Product Preview"
                className="mt-4 max-w-xs mx-auto"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-50"
          >
            Submit Listing
          </button>
        </form>
      </div>

      {/* Right Side - Current Listings */}
      <div className="bg-white p-6 rounded-lg bg-gray-200 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Current Listings</h2>
        {listings.length === 0 ? (
          <p>No listings available.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-row-4 gap-4">
            {listings.map((listing) => (
              <li
                key={listing.id}
                className="border bg-gray-800 text-white border-black rounded-lg p-2"
              >
                {" "}
                {/* Reduced padding to make card smaller */}
                <h3 className="text-lg font-semibold leading tight truncate">
                  {listing.name}
                </h3>
                <img
                  src={listing.imageUrl}
                  alt={listing.name}
                  className="w-1/2 my-2 mx-auto relative"
                />
                <p>{listing.description}</p>
                <p>Category: {listing.category}</p>
                <p>Price: ${listing.price}</p>
                <p>Status: {listing.isVerified ? "Verified" : "Unverified"}</p>
                <div className="flex justify-between mt-2"></div>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleVerify(listing.id, listing.category)}
                    className={`text-green-500 font-medium ${
                      listing.isVerified ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={listing.isVerified}
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
