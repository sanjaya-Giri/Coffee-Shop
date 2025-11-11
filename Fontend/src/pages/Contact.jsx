import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Future: connect with backend route (e.g., /api/contact)
      // await axios.post("http://localhost:5000/api/contact", formData);

      console.log("Message sent:", formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Failed to send message. Try again later.");
    }
  };

  return (
    <div className="py-16 px-6 md:px-20 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-brown-700 mb-8 text-center">
        Contact Us ☕
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-400"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-brown-600 text-white py-3 rounded-lg font-semibold hover:bg-brown-700 transition"
        >
          Send Message
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-gray-700 font-medium">{status}</p>
      )}
    </div>
  );
};

export default Contact;
