import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logowhite.png";

const Help = () => {
  return (
    <section className="bg-gray-100 pb-14 text-center">
      {/* Banner */}
      <div className="h-24 w-full flex items-center justify-center bg-gray-800 text-white">
        <img src={logo} alt="Logo" className="h-32" />
      </div>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 mt-8">
          Help & Support
        </h2>

        {/* Intro */}
        <p className="text-lg text-gray-600 mb-8">
          Need assistance? You're in the right place. Below you'll find answers
          to common questions and guides on how to use{" "}
          <span className="font-bold text-indigo-600">BidRare</span>{" "}
          effectively.
        </p>

        {/* FAQ Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              How to create an account?
            </h3>
            <p className="text-gray-600">
              To start bidding or selling, simply click the "Sign Up" button,
              fill in your details, and you're good to go!
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              How do I place a bid?
            </h3>
            <p className="text-gray-600">
              Browse the item, enter your bid amount in the provided field, and
              click 'Place Bid'. You'll be notified if you're the highest
              bidder.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              How do I list an item for auction?
            </h3>
            <p className="text-gray-600">
              Go to the 'Sell' section, click 'List New Item', fill in the item
              details, and set your starting price. Your item will be live for
              bidding shortly.
            </p>
          </motion.div>
        </div>

        {/* Additional Help Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Payment & Security
            </h3>
            <p className="text-gray-600">
              We ensure secure payments through trusted gateways. Your
              transactions are encrypted and protected.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              How do I contact support?
            </h3>
            <p className="text-gray-600">
              If you need further help, reach out to us via our contact form or
              email us at <span className="font-bold">support@bidrare.com</span>
              .
            </p>
          </motion.div>
        </div>

        {/* Closing Statement */}
        <p className="text-lg text-gray-600 mt-8">
          Still have questions? Don’t hesitate to reach out—we're here to help!
        </p>

        {/* Call to Action */}
        <button className="mt-6 bg-indigo-700 text-white px-6 py-3 rounded-full hover:bg-indigo-800 transition duration-300">
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default Help;
