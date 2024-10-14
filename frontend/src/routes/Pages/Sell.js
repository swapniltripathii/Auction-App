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
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Sell() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 
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
        imageUrl,
        isVerified: false,
        isliked :false,
      });

      setProductName("");
      setDescription("");
      setCategory("sneakers");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error uploading the listing:", error);
    }
  };

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const productsCollection = collection(db, "products");
    const userQuery = query(productsCollection, where("userId", "==", userId));

    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const listingsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(listingsData);
    });

    return () => unsubscribe();
  }, [db, auth]);

  const handleVerify = async (id) => {
    const userId = auth.currentUser.uid;
    const listingRef = doc(db, "products", id);
    const listingSnapshot = await getDoc(listingRef);

    if (listingSnapshot.exists()) {
      const listingData = listingSnapshot.data();
      if (listingData.userId === userId) {
        await updateDoc(listingRef, { isVerified: true });
      } else {
        console.error("You can only verify your own listings.");
      }
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  return (
    <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side - New Listing */}
      <div className="bg-gray-300 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">New Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="product-name" className="block text-black font-medium">
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
            <label htmlFor="description" className="block text-black font-medium">
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
              <li key={listing.id} className="border bg-gray-800 text-white border-black rounded-lg p-2">
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
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleVerify(listing.id)}
                    className={`text-green-500 font-medium ${listing.isVerified ? "opacity-50 cursor-not-allowed" : ""}`}
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
