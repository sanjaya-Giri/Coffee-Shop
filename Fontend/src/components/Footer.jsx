import React from 'react';
import { FaCoffee, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <FaCoffee className="text-amber-400" />
          <span className="text-lg font-semibold">Coffee Shop</span>
        </div>
        <p className="flex items-center justify-center space-x-1 text-gray-300">
          <span>Made with</span>
          <FaHeart className="text-red-500" />
          <span>for coffee lovers</span>
        </p>
        <p className="text-gray-400 mt-2">© 2024 Coffee Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;