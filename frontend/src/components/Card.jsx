import React from 'react';

const Card = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add to cart
      </button>
    </div>
  );
};

export default Card;
