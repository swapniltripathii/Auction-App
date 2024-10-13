// src/components/categories/Sneakers.jsx
import React, { useEffect, useState } from 'react';
import Card from '../Card'; // Import your Card component
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'; // Correct import for Firestore

const Sneakers = () => {
  const [sneakerProducts, setSneakerProducts] = useState([]);
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchSneakerProducts = async () => {
      const sneakersCollection = collection(db, 'sneakers'); // Use the db variable
      const sneakersSnapshot = await getDocs(sneakersCollection);
      const sneakersList = sneakersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSneakerProducts(sneakersList);
    };

    fetchSneakerProducts();
  }, [db]);

  return (
    <div className="grid sm:grid-cols-6 gap-6 product-container p-4">
      {sneakerProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Sneakers;
