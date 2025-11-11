import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brown-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <h2 className="text-xl font-semibold mb-3 md:mb-0">
          ☕ Coffee Shop
        </h2>

        {/* Links */}
        <div className="flex gap-4 mb-3 md:mb-0">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/services" className="hover:text-yellow-300">Services</Link>
          <Link to="/blogs" className="hover:text-yellow-300">Blogs</Link>
          <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Coffee Shop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
