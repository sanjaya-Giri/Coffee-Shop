import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { FaCoffee, FaPlus, FaSignOutAlt, FaBlog, FaList } from "react-icons/fa";

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate("/admin");
    }
  }, [admin, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {admin.username}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Services
                </h3>
                <p className="text-2xl font-bold text-amber-600 mt-2">Manage</p>
              </div>
              <FaCoffee className="text-3xl text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Blogs</h3>
                <p className="text-2xl font-bold text-amber-600 mt-2">Manage</p>
              </div>
              <FaBlog className="text-3xl text-amber-500" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Services Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <FaCoffee />
              <span>Services Management</span>
            </h3>
            <div className="space-y-3">
              <Link
                to="/admin/add-service"
                className="flex items-center space-x-3 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-lg transition"
              >
                <FaPlus />
                <span>Add New Service</span>
              </Link>
              <Link
                to="/services"
                className="flex items-center space-x-3 bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-lg transition"
              >
                <FaList />
                <span>View All Services</span>
              </Link>
              <Link
                to="/admin/manage-services"
                className="flex items-center space-x-3 bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-lg transition"
              >
                <FaList />
                <span>Manage All Services</span>
              </Link>
              
            </div>
          </div>

          {/* Blogs Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <FaBlog />
              <span>Blogs Management</span>
            </h3>
            <div className="space-y-3">
              <Link
                to="/admin/add-blog"
                className="flex items-center space-x-3 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-lg transition"
              >
                <FaPlus />
                <span>Add New Blog</span>
              </Link>
              <Link
                to="/blogs"
                className="flex items-center space-x-3 bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-lg transition"
              >
                <FaList />
                <span>View All Blogs</span>
              </Link>

              
              <Link
                to="/admin/manage-blogs"
                className="flex items-center space-x-3 bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-lg transition"
              >
                <FaList />
                <span>Manage All Blogs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
