// src/components/Apparels.js
import React, { useEffect, useState } from 'react';
import Card from '../Card'; // Import your Card component
import { collection, getDocs, getFirestore } from 'firebase/firestore'; // Ensure Firestore is imported
import Loader from '../Loader'; // Import the Loader component

const Apparels = () => {
    const [apparelProducts, setApparelProducts] = useState([]);
    const [Loading, setLoading] = useState(true); // State to track loading
    const db = getFirestore(); // Get Firestore instance

    useEffect(() => {
        const fetchApparelProducts = async () => {
            try {
                const apparelCollection = collection(db, 'apparels'); // Use Firestore instance
                const apparelSnapshot = await getDocs(apparelCollection);
                const apparelList = apparelSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setApparelProducts(apparelList);
            } catch (error) {
                console.error('Error fetching apparels:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchApparelProducts();
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
                    {apparelProducts.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Apparels;
