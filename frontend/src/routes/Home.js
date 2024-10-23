import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Apparels from "../components/categories/Apparels";
import Collectibles from "../components/categories/Collectibles";
import Sneakers from "../components/categories/Sneakers";
import Accessory from "../components/categories/Accessory";
import Electron from "../components/categories/Electron";
import logo from "../assets/images/logo.png";
import localImage from "../assets/images/banner_1.png";
import localImage2 from "../assets/images/banner_2.webp";
import "../components/shared/NavbarBottom.css";
import SliderCard from "../components/SliderCard";
import Footer from "../components/Footer";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    const collectionsToSearch = [
      "apparels",
      "sneakers",
      "electronics",
      "collectibles",
      "accessories",
    ];
    let results = [];
    setLoading(true);
    setSearchResults([]);

    try {
      const promises = collectionsToSearch.map(async (category) => {
        const q = query(collection(db, category));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          if (
            productData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            results.push({
              id: doc.id,
              ...productData,
              category,
            });
          }
        });
      });
      await Promise.all(promises);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const SkeletonLoader = () => (
    <div className="p-2 border-b border-gray-300">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="w-full h-full">
      {/* Navbar */}
      <div className="w-full">
        <div className="fixed w-screen z-50 shadow-md border-b bg-white">
          {/* Top Navbar */}
          <div className="flex flex-col md:flex-row justify-between bg-blue-300 shadow-lg items-center h-24 p-4 md:p-8">
            <Link to="/">
              <img src={logo} alt="BidRare Logo" className="h-24 md:h-28 py-2" />
            </Link>

            <div className="relative flex-grow py-6 px-4 md:px-12 mx-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full p-3 border px-10 bg-gray-100 border border-black rounded"
              />
              {searchQuery && (
                <div className="absolute left-1/2 transform -translate-x-1/2 z-50 top-18 w-5/6 bg-white rounded-md shadow-lg max-h-80 overflow-auto">
                  {loading ? (
                    <>
                      <SkeletonLoader />
                      <SkeletonLoader />
                      <SkeletonLoader />
                    </>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleResultClick(product.id)}
                        className="flex items-center justify-between p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                      >
                        <div className="flex flex-col">
                          <h3 className="text-sm font-medium">{product.name}</h3>
                          <p className="text-xs text-gray-500">Category: {product.category}</p>
                          <p className="text-xs text-gray-500">Price: ${product.price}</p>
                        </div>
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md ml-4"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-gray-500 text-center">No results found</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
              <Link to="/about" className="text-gray-900 px-2 text-lg font-medium">About</Link>
              <Link to="/help" className="text-gray-900 px-2 text-lg font-medium">Help</Link>
              <Link to="/sell" className="text-gray-900 px-2 text-lg font-medium">Sell</Link>
              <Link to="/login" className="px-4 py-2 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl">
                Signup
              </Link>
            </div>
          </div>

          {/* Bottom Navbar */}
          <div className="flex justify-center items-center py-2 bg-blue-400 border-b border-gray-300">
            <Link to="/apparels" className="nav-link">Apparels</Link>
            <Link to="/sneakers" className="nav-link">Sneakers</Link>
            <Link to="/electronics" className="nav-link">Electronics</Link>
            <Link to="/accessories" className="nav-link">Accessories</Link>
            <Link to="/collectibles" className="nav-link">Collectibles</Link>
          </div>
        </div>

        {/* Home Content */}
        <div className="w-full p-4 bg-gray-200">
          <div className="mt-36 px-4 md:px-16">
            <div className="pt-1 pl-4 text-2xl font-semibold">Apparels</div>
            <Apparels />
            <SliderCard />
            <div className="pt-1 pl-4 text-2xl font-semibold">Sneakers</div>
            <Sneakers />
            <div className="pt-1 pl-4 text-2xl font-semibold">Accessories</div>
            <Accessory />
            <div className="my-4 flex flex-col md:flex-row justify-center rounded-2xl">
              <img src={localImage} alt="Local" className="w-full md:w-auto rounded-3xl h-auto mb-4 md:mb-0 md:mr-4" />
              <img src={localImage2} alt="Local" className="w-full md:w-auto rounded-3xl h-auto" />
            </div>
            <div className="pt-1 pl-4 text-2xl font-semibold">Collectibles</div>
            <Collectibles />
            <div className="pt-1 pl-4 text-2xl font-semibold">Electronics</div>
            <Electron />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
