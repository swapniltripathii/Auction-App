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
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Sell() {
  const [activeTab, setActiveTab] = useState("newListing");
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("sneakers");
  const [subcategory, setSubcategory] = useState(""); // New state for subcategory
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
        category,
        subcategory, // Now including subcategory
        price: parseFloat(price),
        imageUrl,
        isVerified: false,
        isliked: false,
      });

      // Clear the form fields
      setProductName("");
      setCategory("sneakers");
      setSubcategory(""); // Reset the subcategory
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error uploading the listing:", error);
    }
  };

  useEffect(() => {
    const productsCollection = collection(db, "products");
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const userId = auth.currentUser.uid;
      const listingsData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((listing) => listing.userId === userId);

      console.log("Current user listings:", listingsData);
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

      if (listingData.userId === userId) {
        await updateDoc(listingRef, { isVerified: true });

        const categoryRef = collection(db, category);
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
    console.log("Attempting to delete product with ID:", id);
    const listingRef = doc(db, "products", id);
    const listingSnapshot = await getDoc(listingRef);

    if (listingSnapshot.exists()) {
      const listingData = listingSnapshot.data();
      const category = listingData.category;

      try {
        await deleteDoc(listingRef);
        console.log("Deleted from products collection");

        const categoryCollectionRef = collection(db, category);
        const querySnapshot = await getDocs(categoryCollectionRef);

        const categoryDoc = querySnapshot.docs.find(
          (doc) =>
            doc.data().userId === listingData.userId &&
            doc.data().name === listingData.name
        );

        if (categoryDoc) {
          await deleteDoc(doc(db, category, categoryDoc.id));
          console.log("Deleted from category collection");
        } else {
          console.warn("Category document not found for deletion");
        }

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

  // Subcategories based on category selection
  const subcategories = {
    sneakers: ["Running", "Casual","Sneakers", "Basketball", "Sliders","Skate","Football" ],
    apparels: ["T-shirt", "Jersey", "Jacket","Hoodies & Sweatshirts","Joggers","Pants"],
    collectibles: ["Action Figures", "Vintage Items", "Memorabilia","Painting","Cards","Toys","Antiques"],
    accessories: ["Bags", "Caps","Watches","Sunglasses"],
    electronics: ["Mobile Phones", "Laptops", "Cameras","GPUs","Headphones","TWS"],
  };

  return (
    <div className="container mx-auto h-full p-5 bg-blue-200 overflow grid grid-cols-1 md:grid-cols-2 gap-10">
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
            <label htmlFor="category" className="block text-black font-medium">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(""); // Reset subcategory when category changes
              }}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="sneakers">Sneakers</option>
              <option value="apparels">Apparels</option>
              <option value="collectibles">Collectibles</option>
              <option value="accessories">Accessories</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="subcategory"
              className="block text-black font-medium"
            >
              Subcategory
            </label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="" disabled>
                Select Subcategory
              </option>
              {subcategories[category]?.map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
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
                className="mt-4 w-36 mx-auto"
              />
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-50"
            >
              Submit Listing
            </button>
          </div>
        </form>
      </div>

      <div className="p-4 rounded-lg bg-gray-600 h-full overflow shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Current Listings</h2>
        {listings.length === 0 ? (
          <p>No listings available.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-row-4 gap-4">
            {listings
              .sort((a, b) => a.isVerified - b.isVerified)
              .map((listing) => (
                <li
                  key={listing.id}
                  className="border bg-white text-black text-sm border-black rounded-lg p-2"
                >
                  <h3 className="text-lg font-semibold leading-tight truncate">
                    {listing.name}
                  </h3>
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="w-1/2 my-2 mx-auto"
                  />
                  <p>Subcategory: {listing.subcategory}</p>{" "}
                  {/* Display subcategory */}
                  <p>Category: {listing.category}</p>
                  <p>Price: ${listing.price}</p>
                  <p>
                    Status: {listing.isVerified ? "Verified" : "Unverified"}
                  </p>
                  <div className=" flex justify-between">
                    <button
                      onClick={() => handleVerify(listing.id, listing.category)}
                      className={`text-green-600 bottom-2 left-2 font-medium ${
                        listing.isVerified
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={listing.isVerified}
                    >
                      {listing.isVerified ? "Verified" : "Verify"}
                    </button>

                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="text-red-600 bottom-2 right-2 font-medium"
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
