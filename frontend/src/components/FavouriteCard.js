import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; // Import icons for liked/unliked state
import { useAuth } from "../contexts/authContext/authcontext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { toast } from "react-toastify";

const FavouriteCard = ({ product }) => {
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
          setIsLiked(favourites.some((fav) => fav.id === product.id)); // Check if this product is liked
        }
      };
      fetchFavourites();
    }
  }, [currentUser, product.id]);

  const toggleLike = async () => {
    if (!currentUser) {
      toast.error("Please log in to modify your favourites.");
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
      toast.warning("Removed from favourites.");
    } else {
      // Add to favourites in Firestore
      await updateDoc(
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
      toast.success("Added to favourites!");
    }

    setIsLiked(!isLiked); // Toggle the liked state
  };

  return (
    <div className="bg-gray-800 text-white border rounded-lg p-3 shadow-sm hover:shadow-md transition duration-200">
      <div className="h-24 flex justify-center items-center relative">
        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-24 h-24 object-contain rounded-md"
        />

        {/* Heart Icon - for like/unlike */}
      </div>

      <div className="mt-3">
        {/* Product name */}
        <h3 className="text-md text-white font-semibold leading-tight truncate">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex justify-between items-center mt-1">
          <div>
            <p className="text-sm text-white">Price</p>
            <p className="text-md text-white font-bold">${product.price}</p>
          </div>
          <button onClick={toggleLike} className=" pt-3 pr-2 rounded-full">
            {isLiked ? (
              <FaHeart className="text-2xl text-red-700" />
            ) : (
              <CiHeart className="text-2xl text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteCard;
