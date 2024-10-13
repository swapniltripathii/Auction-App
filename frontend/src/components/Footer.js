import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-black text-sm py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-6 pl-20 pr-10">
        {/* About Links */}
        <div>
          <h3 className="font-bold mb-1 ">About</h3>
          <ul>
            <li>
              <Link to="/how-it-works" className="hover:text-gray-700 mb-1">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/verification" className="hover:text-gray-700 mb-1">
                Verification
              </Link>
            </li>
            <li>
              <Link to="/newsroom" className="hover:text-gray-700 mb-1">
                Newsroom
              </Link>
            </li>
            <li>
              <Link to="/company" className="hover:text-gray-700 mb-1">
                Company
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-gray-700 mb-1">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-gray-700 mb-1">
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Sell Links */}
        <div>
          <h3 className="font-bold mb-1">Help</h3>
          <ul>
            <li>
              <Link to="/selling-guide" className="hover:text-gray-700 mb-1">
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/professional-tools"
                className="hover:text-gray-700 mb-1"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/stockx-pro" className="hover:text-gray-700 mb-1">
                Product Suggestions
              </Link>
            </li>
            <li>
              <Link to="/developers" className="hover:text-gray-700 mb-1">
                Size Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Sell Links */}
        <div>
          <h3 className="font-bold mb-1">Sell</h3>
          <ul>
            <li>
              <Link to="/selling-guide" className="hover:text-gray-700 mb-1">
                Selling Guide
              </Link>
            </li>
            <li>
              <Link
                to="/professional-tools"
                className="hover:text-gray-700 mb-1"
              >
                Professional Tools
              </Link>
            </li>
            <li>
              <Link to="/stockx-pro" className="hover:text-gray-700 mb-1">
                StockX Pro
              </Link>
            </li>
            <li>
              <Link to="/developers" className="hover:text-gray-700 mb-1">
                Developers
              </Link>
            </li>
          </ul>
        </div>

        {/* Nike Links */}
        <div>
          <h3 className="font-bold mb-1">Nike</h3>
          <ul>
            <li>
              <Link to="/nike-air-force-1" className="hover:text-gray-700 mb-1">
                Nike Air Force 1
              </Link>
            </li>
            <li>
              <Link to="/nike-air-max-1" className="hover:text-gray-700 mb-1">
                Nike Air Max 1
              </Link>
            </li>
            <li>
              <Link to="/nike-dunk" className="hover:text-gray-700 mb-1">
                Nike Dunk
              </Link>
            </li>
            <li>
              <Link to="/nike-sb" className="hover:text-gray-700 mb-1">
                Nike SB
              </Link>
            </li>
            <li>
              <Link to="/nike-sb" className="hover:text-gray-700 mb-1">
                Women's Nike Dunks
              </Link>
            </li>
            <li>
              <Link to="/nike-sb" className="hover:text-gray-700 mb-1">
                Nike Vomero 5
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-1 ">Adidas</h3>
          <ul>
            <li>
              <Link to="/how-it-works" className="hover:text-gray-700 mb-1">
                Adidas Samba
              </Link>
            </li>
            <li>
              <Link to="/verification" className="hover:text-gray-700 mb-1">
                Adidas Campus
              </Link>
            </li>
            <li>
              <Link to="/newsroom" className="hover:text-gray-700 mb-1">
                Adidas Gazelle
              </Link>
            </li>
            <li>
              <Link to="/company" className="hover:text-gray-700 mb-1">
                Adidas Handball Spezial
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-gray-700 mb-1">
                Adidas AE
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-gray-700 mb-1">
                Adidas Yeezy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-1 ">New Balance</h3>
          <ul>
            <li>
              <Link to="/how-it-works" className="hover:text-gray-700 mb-1">
                New Balance 2002R
              </Link>
            </li>
            <li>
              <Link to="/verification" className="hover:text-gray-700 mb-1">
                New Balance 1906R
              </Link>
            </li>
            <li>
              <Link to="/newsroom" className="hover:text-gray-700 mb-1">
                New Balance 530
              </Link>
            </li>
            <li>
              <Link to="/company" className="hover:text-gray-700 mb-1">
                New Balance 550
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-gray-700 mb-1">
                New Balance 9060
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-gray-700 mb-1">
                New Balance 990 V1
              </Link>
            </li>
          </ul>
        </div>

        <div className="mx-auto mt-8 flex justify-between pl-96 space-x-24 items-center">
          {/* Social Media Icons in the Center */}
          <div className="space-x-4 flex justify-center">
            <Link to="#">
              <FontAwesomeIcon
                icon={faInstagram}
                className="hover:text-gray-700 text-3xl"
              />
            </Link>
            <Link to="#">
              <FontAwesomeIcon
                icon={faTwitter}
                className="hover:text-gray-700 text-3xl"
              />
            </Link>
            <Link to="#">
              <FontAwesomeIcon
                icon={faFacebook}
                className="hover:text-gray-700 text-3xl"
              />
            </Link>
          </div>
          <div className="text-left flex items-center space-x-1 pr-36">
            <span>&copy;</span>
            <span>2024</span>
            <span>BidRARE.</span>
            <span>All</span>
            <span>Rights</span>
            <span>reserved.</span>
            <p className="text-black">
              <Link to="/terms" className="hover:text-gray-700">
                Terms
              </Link>
              <span>|</span>
              <Link to="/privacy" className="hover:text-gray-700">
                Privacy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
