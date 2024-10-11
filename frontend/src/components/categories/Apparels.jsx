import React from 'react';
import Card from '../Card'; // Import your Card component
import products from '../data'; // Import your products data

const Apparels = () => {
  const apparelProducts = products.apparels; // Get only apparels

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 product-container p-4">
      {apparelProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Apparels;
