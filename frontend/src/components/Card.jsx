import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/authContext/authcontext"; // Import the auth context
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"; // Firestore methods
import { firestore } from "../firebase/firebase"; // Import your firebase setup
import "react-toastify/dist/ReactToastify.css";

const Card = ({ product }) => {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  // Check if the product is already in the user's favourites when the component mounts
  useEffect(() => {
    if (currentUser) {
      const fetchFavourites = async () => {
        const docRef = doc(firestore, "favourites", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const favourites = docSnap.data().products || [];
          setIsLiked(favourites.some((fav) => fav.id === product.id));
        }
      };
      fetchFavourites();
    }
  }, [currentUser, product.id]);

  const likeHandler = async () => {
    if (!currentUser) {
      toast.error("Please log in to add products to favourites");
      return;
    }

    const userFavouritesRef = doc(firestore, "favourites", currentUser.uid);

    if (isLiked) {
      // Remove from favourites in Firestore
      await updateDoc(userFavouritesRef, {
        products: arrayRemove({
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
        }),
      });
      toast.warning("Product removed from favourites");
    } else {
      // Add to favourites in Firestore
      await setDoc(
        userFavouritesRef,
        {
          products: arrayUnion({
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
          }),
        },
        { merge: true }
      );
      toast.success("Product added to Favourites");
    }

    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-black text-white pt-4 pl-4 pr-4 pb-2 rounded-lg shadow-lg max-w-xs">
      <div className="w-full h-44 flex justify-center items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 mt-2 object-contain bg-white rounded-lg"
        />
      </div>
      <div className="mt-5 h-6">
        <h3 className="text-lg font-semibold leading-tight truncate">
          {product.name}
        </h3>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-md">Price</p>
          <p className="text-xl font-bold">${product.price}</p>
        </div>
        <button onClick={likeHandler} className="p-2 rounded-full">
          {isLiked ? (
            <FaHeart className="text-3xl text-red-700" />
          ) : (
            <CiHeart className="text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
