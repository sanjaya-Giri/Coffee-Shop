import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services and blogs from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, blogRes] = await Promise.all([
          axios.get("http://localhost:5000/api/services"),
          axios.get("http://localhost:5000/api/blogs"),
        ]);

        setServices(serviceRes.data || []);
        setBlogs(blogRes.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="flex justify-center gap-4 mb-8">
        <Link
          to="/add-service"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Service
        </Link>
        <Link
          to="/add-blog"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Blog
        </Link>
      </div>

      {/* Services Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">All Services</h2>
        {services.length === 0 ? (
          <p className="text-gray-500">No services added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="border rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                {service.image && (
                  <img
                    src={`http://localhost:5000/uploads/${service.image}`}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-lg font-bold mb-1">{service.name}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {service.description}
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  ₹{service.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blogs Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                {blog.image && (
                  <img
                    src={`http://localhost:5000/uploads/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
                <p className="text-sm text-gray-700">{blog.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
