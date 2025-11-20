import React from 'react';
import { Link } from 'react-router-dom';
import { FaCoffee } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-brown-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <FaCoffee className="text-amber-400 " />
            <span className='text-gray-400'>Coffee Shop</span>
          </Link>
          
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-amber-300 text-gray-400 transition">Home</Link>
            <Link to="/services" className="hover:text-amber-300 text-gray-400 transition">Services</Link>
            <Link to="/blogs" className="hover:text-amber-300 text-gray-400 transition">Blogs</Link>
            <Link to="/admin" className="hover:text-amber-300 text-gray-400 transition">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;