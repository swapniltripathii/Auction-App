// src/components/Collectibles.js
import React, { useEffect, useState } from 'react';
import Card from '../Card'; // Import your Card component
import { collection, getDocs, getFirestore } from 'firebase/firestore'; // Import necessary Firestore functions

const Collectibles = () => {
  const [collectibleProducts, setCollectibleProducts] = useState([]);
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchCollectibleProducts = async () => {
      const collectiblesCollection = collection(db, 'collectibles'); // Use the db variable
      const collectiblesSnapshot = await getDocs(collectiblesCollection);
      const collectiblesList = collectiblesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCollectibleProducts(collectiblesList);
    };

    fetchCollectibleProducts();
  }, [db]);

  return (
    <div className="grid sm:grid-cols-6 gap-6 product-container p-4">
      {collectibleProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Collectibles;
