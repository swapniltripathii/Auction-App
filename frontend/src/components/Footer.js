import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-black text-sm py-12">
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {/* About Links */}
          <div>
            <h3 className="font-bold mb-1">About</h3>
            <ul>
              <li className="mb-1">How It Works</li>
              <li className="mb-1">Verification</li>
              <li className="mb-1">Newsroom</li>
              <li className="mb-1">Company</li>
              <li className="mb-1">Careers</li>
              <li className="mb-1">Reviews</li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-bold mb-1">Help</h3>
            <ul>
              <li className="mb-1">Help Center</li>
              <li className="mb-1">Contact Us</li>
              <li className="mb-1">Product Suggestions</li>
              <li className="mb-1">Size Guide</li>
            </ul>
          </div>

          {/* Sell Links */}
          <div>
            <h3 className="font-bold mb-1">Sell</h3>
            <ul>
              <li className="mb-1">Selling Guide</li>
              <li className="mb-1">Professional Tools</li>
              <li className="mb-1">StockX Pro</li>
              <li className="mb-1">Developers</li>
            </ul>
          </div>

          {/* Nike Links */}
          <div>
            <h3 className="font-bold mb-1">Nike</h3>
            <ul>
              <li className="mb-1">Nike Air Force 1</li>
              <li className="mb-1">Nike Air Max 1</li>
              <li className="mb-1">Nike Dunk</li>
              <li className="mb-1">Nike SB</li>
              <li className="mb-1">Women's Nike Dunks</li>
              <li className="mb-1">Nike Vomero 5</li>
            </ul>
          </div>

          {/* Adidas Links */}
          <div>
            <h3 className="font-bold mb-1">Adidas</h3>
            <ul>
              <li className="mb-1">Adidas Samba</li>
              <li className="mb-1">Adidas Campus</li>
              <li className="mb-1">Adidas Gazelle</li>
              <li className="mb-1">Adidas Handball Spezial</li>
              <li className="mb-1">Adidas AE</li>
              <li className="mb-1">Adidas Yeezy</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Social Media Icons */}
          <div className="space-x-4 flex justify-center">
            <FontAwesomeIcon
              icon={faInstagram}
              className="hover:text-gray-700 text-3xl"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="hover:text-gray-700 text-3xl"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              className="hover:text-gray-700 text-3xl"
            />
          </div>

          {/* Footer Text */}
          <div className="text-center md:text-left flex items-center space-x-1">
            <span>&copy; 2024 BidRARE.</span>
            <span>All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
