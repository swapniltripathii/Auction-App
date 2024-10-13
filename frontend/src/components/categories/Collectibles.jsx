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

  return (
    <div className="product-container p-4">
      {Loading ? ( // Display loader if loading is true
        <div className="flex justify-center items-center">
          <div className="loader"></div> {/* Simple CSS loader */}
          <Loader/>
        </div>
      ) : (
        <div className="grid sm:grid-cols-6 gap-6">
          {collectibleProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collectibles;
