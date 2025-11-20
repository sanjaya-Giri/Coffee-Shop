import React from 'react';
import { Link } from 'react-router-dom';
import { FaCoffee, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <FaCoffee className="text-6xl text-amber-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to Coffee Shop
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the finest coffee blends and learn about the art of coffee brewing through our stories and services.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/services" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition"
            >
              <span>View Services</span>
              <FaArrowRight />
            </Link>
            <Link 
              to="/blogs" 
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Read Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCoffee className="text-2xl text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Coffee</h3>
              <p className="text-gray-600">Handcrafted coffee blends from around the world</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCoffee className="text-2xl text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Service</h3>
              <p className="text-gray-600">Professional baristas and quality service</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCoffee className="text-2xl text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Coffee Stories</h3>
              <p className="text-gray-600">Learn about coffee culture and brewing techniques</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;