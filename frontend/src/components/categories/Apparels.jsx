import React from 'react';
import Card from '../Card'; // Import your Card component
import products from '../data'; // Import your products data

const Apparels = () => {
  const apparelProducts = products.apparels; // Get only apparels

  return (
    <div className="flex flex-wrap product-container">
      {apparelProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Apparels;
