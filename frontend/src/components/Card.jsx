import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Card = ({ product }) => {
  return (
    <div className="bg-black text-white pt-4 pl-4 pr-4 pb-2 rounded-lg shadow-lg max-w-xs">
      <div className="w-full h-44 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 mt-3 object-contain bg-white rounded-lg"
        />
      </div>

      {/* Fixed height for name */}
      <div className="mt-6 h-8 ">
        <h3 className="text-lg font-semibold leading-tight truncate ">
          {product.name}
        </h3>
      </div>

      {/* Flexbox for prices and heart icon */}
      <div className="flex justify-between items-center mt-1">
        <div>
          <p className="text-gray-400 text-sm">Lowest Ask</p>
          <p className="text-2xl font-bold">${product.lowestAsk}</p>
        </div>
        <button className="p-2 bg-white rounded-full"> {/* Heart icon button */}
          <FaHeart className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default Card;
