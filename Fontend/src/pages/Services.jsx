import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard.jsx';
import { serviceService } from '../services/serviceService.js';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceService.getServices();
      console.log('API Response:', response); // Debug log
      
      // Handle different response structures
      let servicesData = [];
      
      if (Array.isArray(response.data)) {
        // If response.data is directly an array
        servicesData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        // If response.data.data is an array
        servicesData = response.data.data;
      } else {
        console.error('Unexpected response structure:', response);
        setError('Unexpected data format from server');
      }
      
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button 
            onClick={fetchServices}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Coffee Services
        </h1>
        
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No services available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back later for our coffee offerings!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;