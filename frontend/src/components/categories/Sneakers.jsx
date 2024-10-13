// src/components/categories/Sneakers.jsx
import React, { useEffect, useState } from 'react';
import Card from '../Card'; // Import your Card component
import { collection, getDocs, getFirestore } from 'firebase/firestore'; // Correct import for Firestore
import Loader from '../Loader'; // Import the Loader component

const Sneakers = () => {
  const [sneakerProducts, setSneakerProducts] = useState([]);
  const [Loading, setLoading] = useState(true); // State to track loading
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchSneakerProducts = async () => {
      try {
        const sneakersCollection = collection(db, 'sneakers'); // Use the db variable
        const sneakersSnapshot = await getDocs(sneakersCollection);
        const sneakersList = sneakersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSneakerProducts(sneakersList);
      } catch (error) {
        console.error('Error fetching sneakers:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchSneakerProducts();
  }, [db]);

  return (
    <div className="product-container p-4">
      {Loading ? ( // Display loader if loading is true
        <div className="flex justify-center items-center">
          <div className="loader"></div> {/* Simple CSS loader */}
          <Loader />
        </div>
      ) : (
        <div className="grid sm:grid-cols-6 gap-6">
          {sneakerProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sneakers;
