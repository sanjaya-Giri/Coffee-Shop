import API from './api.js';

export const serviceService = {
  getServices: () => API.get('/services'),
  getService: (id) => API.get(`/services/${id}`),
  createService: (formData) => API.post('/services', formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  }),
  updateService: (id, formData) => API.put(`/services/${id}`, formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  }),
  deleteService: (id) => API.delete(`/services/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  })
};