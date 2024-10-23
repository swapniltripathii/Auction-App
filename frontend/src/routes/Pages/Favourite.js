import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext/authcontext";
import { doc, getDoc } from "firebase/firestore";
import FavouriteCard from "../../components/FavouriteCard"; // Use smaller card component
import { firestore } from "../../firebase/firebase"; // Import Firestore
import ProfileLayout from "../../components/ProfileLayouts";
import Footer from "../../components/Footer";
const Favourite = () => {
  const { currentUser } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchFavourites = async () => {
      if (currentUser) {
        const docRef = doc(firestore, "favourites", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFavourites(docSnap.data().products || []);
        }
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchFavourites();
  }, [currentUser]);

  return (
    <div className="h-full w-full bg-white">
      <ProfileLayout>
        <div className="p-6 bg-white">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Favourites
          </h1>

          {loading ? (
            <p>Loading favourites...</p>
          ) : favourites.length === 0 ? (
            <p>No favourites added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
              {favourites.map((product) => (
                <FavouriteCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </ProfileLayout>
      <Footer />
    </div>
  );
};

export default Favourite;
