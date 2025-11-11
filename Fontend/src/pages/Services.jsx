import React, { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading services...
      </div>
    );
  }

  return (
    <div className="py-16 px-6 md:px-20 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-brown-700">
        Our Coffee Services ☕
      </h1>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No coffee services available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {service.image && (
                <img
                  src={`http://localhost:5000/uploads/${service.image}`}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {service.name}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {service.description}
                </p>
                <p className="text-lg font-semibold text-brown-600">
                  ₹{service.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
