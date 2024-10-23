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
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("sneakers");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null); // ID of the product being edited
  const db = getFirestore();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sellerId = auth.currentUser.uid;

    // Set expiry date to 30 days from today
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // Add 30 days

    const productData = {
      sellerId,
      name: productName,
      category,
      subcategory,
      price: parseFloat(price),
      imageUrl,
      expiryDate: expiryDate.toISOString(),
      verified: false,
      isLiked: false,
    };

    if (editingId) {
      // If editing, update the existing product
      const listingRef = doc(db, "products", editingId);
      await updateDoc(listingRef, productData);
      setEditingId(null); // Reset editing state
    } else {
      // Add a new product
      await addDoc(collection(db, "products"), productData);
    }

    // Reset form fields
    setProductName("");
    setCategory("sneakers");
    setSubcategory("sneakers");
    setPrice("");
    setImageUrl("");
  };

  useEffect(() => {
    const productsCollection = collection(db, "products");
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const sellerId = auth.currentUser.uid;
      const listingsData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((listing) => listing.sellerId === sellerId); // Changed userId to sellerId

      setListings(listingsData);
    });

    return () => unsubscribe();
  }, [db, auth.currentUser.uid]);

  const handleUpdate = (listing) => {
    // Populate form with selected listing's data for editing
    setEditingId(listing.id);
    setProductName(listing.name);
    setCategory(listing.category);
    setSubcategory(listing.subcategory);
    setPrice(listing.price);
    setImageUrl(listing.imageUrl);
  };

  // Deleting the product from current listings & Firestore
  const handleDelete = async (id) => {
    const listingRef = doc(db, "products", id);
    const listingSnapshot = await getDoc(listingRef);

    if (listingSnapshot.exists()) {
      const listingData = listingSnapshot.data();
      const category = listingData.category;

      try {
        await deleteDoc(listingRef);

        const categoryCollectionRef = collection(db, category);
        const querySnapshot = await getDocs(categoryCollectionRef);

        const categoryDoc = querySnapshot.docs.find(
          (doc) =>
            doc.data().sellerId === listingData.sellerId && // Changed userId to sellerId
            doc.data().name === listingData.name
        );

        if (categoryDoc) {
          await deleteDoc(doc(db, category, categoryDoc.id));
        }

        setListings((prevListings) =>
          prevListings.filter((listing) => listing.id !== id)
        );
      } catch (error) {
        console.error("Error deleting the product:", error);
      }
    } else {
      console.error("Product not found in the 'products' collection.");
    }
  };

  const subcategories = {
    sneakers: [
      "Running",
      "Casual",
      "Sneakers",
      "Basketball",
      "Sliders",
      "Skate",
      "Football",
    ],
    apparels: [
      "T-shirt",
      "Jersey",
      "Jacket",
      "Hoodies & Sweatshirts",
      "Joggers",
      "Pants",
    ],
    collectibles: [
      "Action Figures",
      "Vintage Items",
      "Memorabilia",
      "Painting",
      "Cards",
      "Toys",
      "Antiques",
    ],
    accessories: ["Bags", "Caps", "Watches", "Sunglasses"],
    electronics: [
      "Mobile Phones",
      "Laptops",
      "Cameras",
      "GPUs",
      "Headphones",
      "TWS",
      "Controller",
      "Console",
      "VR headset",
      "Speaker",
    ],
  };

  return (
    <div className="container mx-auto h-full p-5 bg-blue-200 overflow grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="bg-gray-300 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? "Edit Listing" : "New Listing"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Form for product details */}
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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image-url" className="block text-black font-medium">
              Image URL
            </label>
            <input
              id="image-url"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
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
              className="w-1/3 bg-black text-white py-2 rounded-lg"
            >
              {editingId ? "Update Listing" : "Submit Listing"}
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
            {listings.map((listing) => (
              <li
                key={listing.id}
                className="border bg-white text-black text-sm border-black rounded-lg p-2"
              >
                <h3 className="text-md font-semibold leading-tight truncate">
                  {listing.name}
                </h3>
                <img
                  src={listing.imageUrl}
                  alt={listing.name}
                  className="w-2/3 h-28 my-2 mx-auto"
                />
                <p>Category: {listing.category}</p>
                <p>Subcategory: {listing.subcategory}</p>
                <p>Price: ${listing.price}</p>
                <p>Status: {listing.verified ? "Verified" : "Unverified"}</p>

                {/* Display Listing Type */}
                <div className="flex justify-between">
                  <button
                    onClick={() => handleUpdate(listing)}
                    className="text-blue-600 bottom-2 left-2 font-medium "
                  >
                    Update
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
