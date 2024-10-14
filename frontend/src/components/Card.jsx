import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton"; // Import skeleton loader
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/authContext/authcontext";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ product, isLoading }) => {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

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
    setHasClicked(true);
  };

  if (isLoading) {
    return (
      <div className="bg-black text-white p-4 rounded-lg shadow-lg max-w-xs">
        <Skeleton height={150} />
        <Skeleton width={100} />
        <Skeleton width={80} />
        <Skeleton circle={true} height={50} width={50} />
      </div>
    );
  }

  return (
    <motion.div
      className="bg-black text-white p-4 rounded-lg shadow-lg max-w-xs"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        <motion.button
          onClick={likeHandler}
          whileTap={{ scale: 1.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="p-2 rounded-full"
        >
          {isLiked ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={hasClicked ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaHeart className="text-3xl text-red-700" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 1 }}
              animate={hasClicked ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CiHeart className="text-3xl" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Card;
