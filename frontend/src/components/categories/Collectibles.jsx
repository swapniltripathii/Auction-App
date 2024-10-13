import React from 'react';
import Card from '../Card'; // Import your Card component
import products from '../data'; // Import your products data

const Collectibles = () => {
  const collectibleProducts = products.collectibles; // Get only collectibles data from products

  return (
    <div className="grid sm:grid-cols-6 gap-6 product-container p-4">
      {collectibleProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Collectibles;
