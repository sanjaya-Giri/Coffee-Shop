import API from './api.js';

export const blogService = {
  getBlogs: () => API.get('/blogs'),
  getBlog: (id) => API.get(`/blogs/${id}`),
  createBlog: (formData) => API.post('/blogs', formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  }),
  updateBlog: (id, formData) => API.put(`/blogs/${id}`, formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  }),
  deleteBlog: (id) => API.delete(`/blogs/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  })
};