import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import NavbarTop from "./shared/NavbarTop";
import Footer from "./Footer";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [daysLeft, setDaysLeft] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore();
        const collections = [
          "apparels",
          "collectibles",
          "sneakers",
          "accessories",
          "electronics",
        ];

        let productDoc = null;

        for (let collection of collections) {
          const docRef = doc(db, collection, productId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            productDoc = docSnapshot;
            break;
          }
        }

        if (productDoc) {
          const productData = productDoc.data();
          setProduct(productData);

          // Calculate days left for listing
          if (productData.listingEndDate) {
            const endDate = new Date(productData.listingEndDate.seconds * 1000);
            const today = new Date();
            const timeDifference = endDate - today;
            const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            setDaysLeft(daysLeft);
          }
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleBidNowClick = () => {
    navigate(`/bid/${productId}`);
  };

  return (
    <div className="bg-gray-900 w-full h-full">
      <div className="fixed top-0 left-0 w-full z-10">
        <NavbarTop />
      </div>
      <div className="flex justify-center items-center pb-20 relative pt-52">
        <div className="flex flex-col w-full sm:w-4/5 lg:w-1/2 p-6 sm:p-8 bg-gray-900 text-white rounded-2xl border border-black shadow-2xl">
          <div className="text-md mb-4 text-gray-400">
            Home / {product.category}/{product.subcategory} / {product.name}
          </div>
          <div className="flex flex-col sm:flex-row md:gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-full sm:w-96 h-96 p-1 rounded-2xl shadow-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain bg-white rounded-2xl"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col w-full justify-between mt-6 sm:mt-0">
              <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

              {/* Days Left */}
              {daysLeft !== null && daysLeft >= 0 && (
                <div className="text-sm text-gray-300 mb-4">
                  {daysLeft} {daysLeft === 1 ? "day" : "days"} left to be listed.
                </div>
              )}

              {/* Price Box */}
              <div className="flex flex-col p-3 border rounded-2xl space-y">
                <h2 className="text-md font-md p-1"> Ask Price </h2>
                <div className="text-xl font-bold pl-1 pb-3">
                  ${product.price}
                </div>
                <div className="flex justify-center h-10 w-full gap-5">
                  <button
                    onClick={handleBidNowClick}
                    className="bg-green-500 text-white px-5 py-2 rounded-full w-full border border-gray-400 hover:border-black"
                  >
                    Place Bid
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
