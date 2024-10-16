import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Adjust imports for Firestore
import NavbarTop from "./shared/NavbarTop";
import Footer from "./Footer";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore(); // Get Firestore instance
        const collections = [
          "apparels",
          "collectibles",
          "sneakers",
          "accessories",
          "electronics",
        ];

        let productDoc = null;

        // Loop through each collection to find the product by productId
        for (let collection of collections) {
          const docRef = doc(db, collection, productId); // Use doc to reference the document
          const docSnapshot = await getDoc(docRef); // Fetch the document

          if (docSnapshot.exists()) {
            console.log("Product found in collection:", collection);
            productDoc = docSnapshot;
            break; // Exit the loop if the product is found
          } else {
            console.log("Product not found in collection:", collection);
          }
        }

        if (productDoc) {
          setProduct(productDoc.data());
          console.log("Product data:", productDoc.data());
        } else {
          console.log("Product does not exist.");
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-900 w-full h-full">
      <div className="fixed top-0 left-0 w-full z-10">
        <NavbarTop />
      </div>
      {/* Content: Add padding-top to prevent initial overlap */}
      <div className="flex justify-center items-center pb-20 relative pt-52">
        {/* Product Card */}
        <div className="flex flex-col w-1/2 p-8  bg-gray-900 text-white rounded-2xl border border-black shadow-2xl">
          <div className="text-md mb-4 text-gray-400">
            Home / {product.category}/{product.subcategory} / {product.name}
          </div>
          <div className="flex flex-col sm:flex-row md:gap-6">
            <div className="flex-shrink-0">
              <div className=" w-96 h-96 p-1 rounded-2xl shadow-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-96 h-96 object-contain bg-white rounded-2xl "
                />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
              <div className="flex flex-col p-3 border rounded-2xl space-y">
                <h2 className="text-md font-md p-1">Buy Now for</h2>
                <h2 className="text-xl font-bold pl-1 pb-3">${product.price}</h2>
                <div className="flex justify-center h-10 w-full gap-5">
                  <button className="bg-green-500 text-white px-5 py-2 rounded-full border border-gray-400 hover:border-black hover:bg-green-600 transition">
                    Place Bid
                  </button>
                  <button className="bg-blue-500 text-white px-5 py-2 rounded-full border border-gray-400 hover:border-black hover:bg-blue-600 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
