import React, { useState } from "react";
import axios from "axios";

export default function Sell() {
  // Tab state
  const [activeTab, setActiveTab] = useState("newListing");

  // State for form input
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("shoes");
  const [price, setPrice] = useState("");

  // State to store the current listings
  const [listings, setListings] = useState([]);

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Function to handle form submission and API request
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Assuming you have the user's ID from your auth context or state
    const userId = "USER_ID_HERE"; // Replace this with the actual user ID from your auth state
  
    const newListing = {
      userId, // Set this dynamically from the logged-in user
      productName,
      description,
      image,
      category,
      price,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/add-listing",
        newListing
      );
  
      console.log("New listing created", response.data);
      setListings([...listings, response.data]);
  
      setProductName("");
      setDescription("");
      setImage(null);
      setCategory("shoes");
      setPrice("");
      setActiveTab("currentListing"); // Switch to current listings
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      {/* Tabs Section */}
      <div className="flex justify-around mb-6">
        <button
          className={`px-6 py-2 text-lg font-medium ${
            activeTab === "newListing" ? "bg-black text-white" : "bg-gray-200 text-black"
          } rounded-lg focus:outline-none transition duration-200`}
          onClick={() => setActiveTab("newListing")}
        >
          New Listing
        </button>
        <button
          className={`px-6 py-2 text-lg font-medium ${
            activeTab === "currentListing" ? "bg-black text-white" : "bg-gray-200 text-black"
          } rounded-lg focus:outline-none transition duration-200`}
          onClick={() => setActiveTab("currentListing")}
        >
          Current Listings
        </button>
        <button
          className={`px-6 py-2 text-lg font-medium ${
            activeTab === "pendingSells" ? "bg-black text-white" : "bg-gray-200 text-black"
          } rounded-lg focus:outline-none transition duration-200`}
          onClick={() => setActiveTab("pendingSells")}
        >
          Pending Sells
        </button>
      </div>

      {/* Conditional Render Based on Tab */}
      {activeTab === "newListing" && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Create New Listing</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="product-name" className="block text-gray-700 font-medium">
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
              <label htmlFor="description" className="block text-gray-700 font-medium">
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
              <label htmlFor="category" className="block text-gray-700 font-medium">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="shoes">Shoes</option>
                <option value="apparels">Apparels</option>
                <option value="collectibles">Collectibles</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-medium">
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
              <label htmlFor="image" className="block text-gray-700 font-medium">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {image && (
                <img src={image} alt="Product Preview" className="mt-4 max-w-xs mx-auto" />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              Submit Listing
            </button>
          </form>
        </div>
      )}

      {/* Current Listings Tab */}
      {activeTab === "currentListing" && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Current Listings</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Display product cards */}
            {listings.map((listing) => (
              <div key={listing._id} className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center space-x-4">
                <img src={listing.image} alt={listing.productName} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{listing.productName}</h3>
                  <p className="text-gray-700">{listing.description}</p>
                  <p className="text-gray-900 font-bold">${listing.price}</p>
                  <p className="text-gray-600">Category: {listing.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
