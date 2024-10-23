import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/authContext/authcontext";
import logo from "../../assets/images/logo.png";
import { FaUser, FaHeart } from "react-icons/fa";

const NavbarTop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const navigate = useNavigate();
  const { userLoggedIn, handleLogout } = useAuth();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) handleSearch();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
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
            productData.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
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

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const SkeletonLoader = () => (
    <div className="p-2 border-b border-gray-300">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  const buttonAnimation = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div>
      <div className="fixed w-screen flex flex-col justify-between items-center shadow-md z-10">
        <div className="flex flex-col md:flex-row justify-between bg-blue-300 shadow-lg w-full h-auto md:h-24 px-4 md:px-8 items-center">
          <Link to="/home" className="py-2">
            <img src={logo} alt="BidRare Logo" className="h-20 md:h-28 py-2" />
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
                        <p className="text-xs text-gray-500">
                          Category: {product.category}
                        </p>
                        <p className="text-xs text-gray-500">
                          Price: ${product.price}
                        </p>
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
                  <p className="p-2 text-gray-500 text-center">
                    No results found
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              to="/about"
              className="text-gray-900 text-sm md:text-lg font-medium"
            >
              About
            </Link>
            <Link
              to="/help"
              className="text-gray-900 text-sm md:text-lg font-medium"
            >
              Help
            </Link>
            <Link
              to="/sell"
              className="text-gray-900 text-sm md:text-lg font-medium"
            >
              Sell
            </Link>
            {userLoggedIn ? (
              <div className="flex gap-x-3 md:gap-x-7">
                <div className="flex py-2 gap-x-3 md:gap-x-6">
                  <Link
                    to="/profile"
                    className="text-xl md:text-2xl text-gray-700 pt-1"
                  >
                    <FaUser />
                  </Link>
                  <Link
                    to="/favourite"
                    className="text-xl md:text-2xl text-gray-700 pt-1"
                  >
                    <FaHeart />
                  </Link>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleLogoutClick}
                    className="px-3 md:px-4 py-2 bg-white text-black border border-black hover:bg-black transition hover:text-white font-medium rounded-3xl"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <motion.div
                  variants={buttonAnimation}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/login"
                    className="px-3 md:px-4 py-2 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  variants={buttonAnimation}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/signup"
                    className="px-3 md:px-4 py-2 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl"
                  >
                    Signup
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-center items-center py-2 bg-blue-400 border-b border-gray-300">
          {[
            "apparels",
            "sneakers",
            "electronics",
            "accessories",
            "collectibles",
          ].map((category) => (
            <Link
              to={`/${category}`}
              className="nav-link text-sm md:text-base mx-2"
              key={category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
