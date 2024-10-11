import React from "react";

export default function Home({ listings }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Product Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="p-4 bg-white shadow-md rounded-lg">
            <img
              src={listing.image}
              alt={listing.productName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{listing.productName}</h3>
            <p className="text-gray-500">{listing.category}</p>
            <p className="text-gray-700 mb-2">{listing.description}</p>
            <p className="text-black font-bold">${listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
