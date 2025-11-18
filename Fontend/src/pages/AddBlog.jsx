import React, { useState } from "react";
import axios from "axios";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [message, setMessage] = useState("");

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setMessage("Unauthorized! Please login as admin.");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/blogs/create", formData, {
      headers: {
       
        Authorization: `Bearer ${token}`,  // 🔥 REQUIRED
      },
      withCredentials: true,
    });

      if (res.status === 201) {
        setMessage("✅ Blog added successfully!");
        setFormData({ title: "", content: "", author: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to add blog.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add New Blog
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="Enter blog title"
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="Enter author name"
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Blog
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddBlog;
