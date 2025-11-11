import React, { useState } from "react";
import axios from "axios";

const AddService = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handle text inputs
  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", service.name);
    formData.append("description", service.description);
    formData.append("price", service.price);
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/services/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "Service added successfully!");
      setService({ name: "", description: "", price: "" });
      setImage(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding service.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Service</h2>
      {message && <p className="text-center mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Service Name</label>
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={service.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
