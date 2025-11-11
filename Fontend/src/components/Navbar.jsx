import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-brown-700 text-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        ☕ Coffee Shop
      </Link>

      {/* Nav Links */}
      <div className="flex gap-4">
        <Link to="/" className="hover:text-yellow-300">
          Home
        </Link>
        <Link to="/services" className="hover:text-yellow-300">
          Services
        </Link>
        <Link to="/blogs" className="hover:text-yellow-300">
          Blogs
        </Link>
        <Link to="/contact" className="hover:text-yellow-300">
          Contact
        </Link>

        {/* Admin Section */}
        {isAdmin ? (
          <>
            <Link to="/admin/dashboard" className="hover:text-yellow-300">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/admin/login"
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
          >
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
