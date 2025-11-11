import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, blogRes] = await Promise.all([
          axios.get("http://localhost:5000/api/services"),
          axios.get("http://localhost:5000/api/blogs"),
        ]);
        setServices(serviceRes.data || []);
        setBlogs(blogRes.data || []);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')] bg-cover bg-center text-white py-32 text-center">
        <div className="bg-black/50 p-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to CoffeeCraft ☕
          </h1>
          <p className="text-lg md:text-xl mb-6">
            “Brewed with passion, served with love.”
          </p>
          <Link
            to="/services"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
          >
            Explore Our Menu
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-20 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          At <strong>CoffeeCraft</strong>, we serve freshly brewed coffee, made
          from premium beans sourced from around the world. Whether you’re
          looking for a perfect espresso, creamy cappuccino, or an adventurous
          cold brew — we’ve got your coffee cravings covered.
        </p>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Popular Services
        </h2>
        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => (
              <div
                key={service._id}
                className="border rounded-lg shadow p-4 hover:shadow-xl transition"
              >
                {service.image && (
                  <img
                    src={`http://localhost:5000/uploads/${service.image}`}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-lg font-bold mb-1">{service.name}</h3>
                <p className="text-sm text-gray-700">{service.description}</p>
                <p className="text-blue-600 font-semibold mt-2">
                  ₹{service.price}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            to="/services"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          From Our Coffee Blog
        </h2>
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog) => (
              <div
                key={blog._id}
                className="border rounded-lg shadow p-4 hover:shadow-xl transition"
              >
                {blog.image && (
                  <img
                    src={`http://localhost:5000/uploads/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
                <p className="text-sm text-gray-700">
                  {blog.content.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Read More Blogs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
