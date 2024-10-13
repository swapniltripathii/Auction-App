import React, { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import {FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Card = ({ product }) => {
  const[isliked,setisLiked] = useState(false)
  const likehandler=()=>{
    setisLiked(!isliked)
    let pr_name = product.name.length>10?(product.name.substring(0,9)+".."):(product.name)
    isliked?toast.warning('Product removed from favourites'):toast.success(`Product added to Favourites`)
  }
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
        <button onClick={likehandler} className="p-2  rounded-full"> 
          {isliked? <FaHeart className='text-3xl text-red-700' />:<CiHeart className="text-3xl " />}
        </button>
      </div>
    </div>
  );
};

export default Card;
