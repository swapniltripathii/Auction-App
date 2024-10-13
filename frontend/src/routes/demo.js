import React from 'react';

const Card = ({ product }) => {
  return (
    <div className="border p-3 rounded-lg shadow-lg bg-white">
      <div className="w-full h-44 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>

      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Buy
      </button>
    </div>
  );
};

export default Card;