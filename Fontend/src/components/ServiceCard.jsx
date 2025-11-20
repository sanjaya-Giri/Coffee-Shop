import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img 
        src={`http://localhost:5001${service.image}`} 
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-3">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-amber-600">₹{service.price}</span>
          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm">
            {service.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;