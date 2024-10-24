import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logowhite.png"; 


const About = () => {
  const navigate = useNavigate(); 

  return (
    <section className="bg-gray-100 overflow-auto h-full text-center">
      {/* Banner */}
      <div className="h-24 w-full flex items-center justify-center bg-gray-800 text-white">
        <img src={logo} alt="Logo" className="h-32" />
      </div>
      <div className="max-w-5xl pt-8 mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold mb-4">About Us</h2>

        {/* Intro */}
        <p className="text-lg text-gray-600 mb-8">
          Welcome to <span className="font-bold text-indigo-600">BidRare</span>,
          where we bring buyers and sellers together in a secure and dynamic
          online auction environment. Our mission is to provide a seamless
          experience where valuable items find the right buyers.
        </p>

        {/* Cards - Why Us */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Transparent Bidding
            </h3>
            <p className="text-gray-600">
              Our transparent bidding system ensures fair play, allowing buyers
              and sellers to confidently engage in auctions.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Safe & Secure
            </h3>
            <p className="text-gray-600">
              We prioritize your security with advanced encryption and secure
              payment methods for a trusted auction experience.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Diverse Categories
            </h3>
            <p className="text-gray-600">
              From rare collectibles to everyday items, we offer a diverse range
              of categories to suit every interest.
            </p>
          </motion.div>
        </div>

        {/* Closing Statement */}
        <p className="text-lg text-gray-600 mt-8">
          Join us today and experience the thrill of online auctions, where
          every bid could lead to your next great find!
        </p>

        {/* Call to Action - Animated Button */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }} // Scale and color change on hover
          whileTap={{ scale: 0.95 }} // Small scale on click
          className="mt-6 bg-indigo-700 text-white px-6 py-3 rounded-full hover:bg-indigo-800 transition duration-300"
          onClick={() => navigate("/home")} // Navigate to /home on click
        >
          Explore Auctions
        </motion.button>
      </div>
    </section>
  );
};

export default About;
