// src/components/Apparels.js
import React, { useEffect, useState } from 'react';
import Card from '../Card'; // Import your Card component
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'; // Ensure Firestore is imported

const Apparels = () => {
    const [apparelProducts, setApparelProducts] = useState([]);
    const db = getFirestore(); // Get Firestore instance

    useEffect(() => {
        const fetchApparelProducts = async () => {
            const apparelCollection = collection(db, 'apparels'); // Updated to use Firestore instance
            const apparelSnapshot = await getDocs(apparelCollection);
            const apparelList = apparelSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setApparelProducts(apparelList);
        };

        fetchApparelProducts();
    }, [db]);

    return (
        <div className="grid sm:grid-cols-6 gap-6 product-container p-4">
            {apparelProducts.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Apparels;
