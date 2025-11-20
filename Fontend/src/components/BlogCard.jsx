import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img 
        src={`http://localhost:5001${blog.image}`} 
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-3">{blog.excerpt || blog.content.substring(0, 150)}...</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>By {blog.author}</span>
          <span>{blog.readTime} min read</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;