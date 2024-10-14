import React, { useEffect, useState } from 'react';
import Card from '../Card'; // Import your Card component
import { collection, getDocs, getFirestore } from 'firebase/firestore'; // Import necessary Firestore functions
import Loader from '../Loader';

const Collectibles = () => {
  const [collectibleProducts, setCollectibleProducts] = useState([]);
  const [Loading, setLoading] = useState(true); // State to track loading
  const db = getFirestore(); // Get Firestore instance

  useEffect(() => {
    const fetchCollectibleProducts = async () => {
      try {
        const collectiblesCollection = collection(db, 'collectibles'); // Use the db variable
        const collectiblesSnapshot = await getDocs(collectiblesCollection);
        const collectiblesList = collectiblesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCollectibleProducts(collectiblesList);
      } catch (error) {
        console.error('Error fetching collectibles:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCollectibleProducts();
  }, [db]);

  // Render loader if loading is still true
  if (Loading) {
    return (
     
        <Loader /> 
      
    );
  }

  // Render "No Collectibles Left" message if no products are found after loading
  if (collectibleProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen"> {/* Centering text horizontally and vertically */}
        <h1 className="text-center text-4xl font-bold text-gray-700">No Collectibles Left</h1> {/* Centered and large text */}
      </div>
    );
  }

  // Render products once loaded
  return (
    <div className="product-container p-4">
      <div className="grid sm:grid-cols-6 gap-6">
        {collectibleProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Collectibles;
