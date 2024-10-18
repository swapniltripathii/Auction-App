import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/authcontext";
import logo from "../../assets/images/logo.png";
import { FaUser, FaHeart } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const NavbarTop = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const navigate = useNavigate();
  const { userLoggedIn, handleLogout } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    const collectionsToSearch = ["apparels", "sneakers", "electronics", "collectibles", "accessories"];
    let results = [];
    setLoading(true);
    setSearchResults([]);

    try {
      const promises = collectionsToSearch.map(async (category) => {
        const q = query(collection(db, category));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          if (productData.name.toLowerCase().includes(searchQuery.toLowerCase())) {
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
      {/* Top Navbar */}
      <div className="fixed w-screen flex justify-between items-center h-24 p-8 bg-neutral-100 shadow-md z-10 border-b bg-gray-200">
        <div className="flex items-center">
          <Link to="/home">
            <img src={logo} alt="BidRare Logo" className="h-24 w-50" />
          </Link>
        </div>
        <form onSubmit={handleSearch} className="relative flex-grow py-6 px-12 ml-2 mr-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full p-3 border px-10 bg-gray-100 border border-black rounded"
          />
          {searchQuery && (
            <div className="mt-7 absolute left-0 top-12 bg-white w-full rounded-md shadow-lg max-h-60 overflow-auto z-20">
              {loading ? (
                <>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </>
              ) : (
                searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleResultClick(product.id)}
                      className=" p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                    >
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-xs text-gray-500">Category: {product.category}</p>
                      <p className="text-xs text-gray-500">Price: ${product.price}</p>
                    </div>
                  ))
                ) : (
                  <p className=" p-2 text-gray-500 text-center">No results found</p>
                )
              )}
            </div>
          )}
        </form>
        <div className="flex items-center space-x-8">
          <motion.div variants={buttonAnimation} initial="initial" whileHover="hover" whileTap="tap">
            <Link to="/about" className="text-gray-900 px-1 text-xl font-medium">
              About
            </Link>
          </motion.div>
          <motion.div variants={buttonAnimation} initial="initial" whileHover="hover" whileTap="tap">
            <Link to="/help" className="text-gray-900 px-1 text-xl font-medium">
              Help
            </Link>
          </motion.div>
          <motion.div variants={buttonAnimation} initial="initial" whileHover="hover" whileTap="tap">
            <Link to="/sell" className="text-gray-900 px-2 text-xl font-medium">
              Sell
            </Link>
          </motion.div>
          {userLoggedIn ? (
            <div className=" flex gap-x-6  pt-1  ">
              <Link to="/profile" className="text-2xl text-gray-700 pt-1 ">
                <FaUser data-tooltip-id="profile-tooltip" data-tooltip-content="Profile" />
              </Link>
              <Tooltip id="profile-tooltip" place="bottom" className="bg-gray-700 text-white text-xs rounded " />
              <Link to="/favourite" className="text-2xl text-gray-700 pt-1">
                <FaHeart data-tooltip-id="fav-tooltip" data-tooltip-content="Favourites" />
              </Link>
              <Tooltip id="fav-tooltip" place="bottom" className="bg-gray-700 text-white text-xs rounded " />
              <button
                onClick={handleLogoutClick}
                className="px-2  py-1 mb-2 bg-white text-black border border-black hover:bg-black transition hover:text-white font-medium rounded-3xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <motion.div variants={buttonAnimation} initial="initial" whileHover="hover" whileTap="tap">
                <Link to="/login" className="px-2 py-1 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl">
                  Login
                </Link>
              </motion.div>
              <motion.div variants={buttonAnimation} initial="initial" whileHover="hover" whileTap="tap">
                <Link to="/signup" className="px-2 py-1 bg-white text-black border border-black hover:bg-black transition duration-300 hover:text-white font-medium rounded-3xl">
                  Signup
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
      {/* Categories Navbar */}
      <div className="fixed z-30 top-24 flex w-full justify-center items-center p-2 bg-blue-100 border-t border-b border-gray-300">
        <Link to="/apparels" className="nav-link">
          Apparels
        </Link>
        <Link to="/shoes" className="nav-link">
          Sneakers
        </Link>
        <Link to="/electronics" className="nav-link">
          Electronics
        </Link>
        <Link to="/accessories" className="nav-link">
          Accessories
        </Link>
        <Link to="/collectibles" className="nav-link">
          Collectibles
        </Link>
      </div>
    </div>
  );
};

export default NavbarTop;
