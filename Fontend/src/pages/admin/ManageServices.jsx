import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { serviceService } from '../../services/serviceService.js';
import { FaCoffee, FaEdit, FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';

const ManageServices = () => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!admin) {
      navigate('/admin');
    } else {
      fetchServices();
    }
  }, [admin, navigate]);

  const fetchServices = async () => {
    try {
      const response = await serviceService.getServices();
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setMessage('Error loading services');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      await serviceService.deleteService(id);
      setMessage('Service deleted successfully');
      fetchServices(); // Refresh the list
    } catch (error) {
      setMessage('Error deleting service');
    }
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <Link
            to="/admin/add-service"
            className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FaPlus />
            <span>Add New Service</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FaCoffee className="text-2xl text-amber-600" />
            <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
          </div>

          {message && (
            <div className={`p-3 rounded mb-4 ${
              message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No services found.</p>
              <Link
                to="/admin/add-service"
                className="inline-block mt-2 text-amber-600 hover:text-amber-700"
              >
                Add your first service
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <img
                          src={`http://localhost:5000${service.image}`}
                          alt={service.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="font-semibold">{service.name}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">
                            {service.description}
                          </p>
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-amber-600">
                        ₹{service.price}
                      </td>
                      <td className="p-3">
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm capitalize">
                          {service.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/admin/edit-service/${service._id}`)}
                            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                          >
                            <FaEdit className="text-xs" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                          >
                            <FaTrash className="text-xs" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageServices;