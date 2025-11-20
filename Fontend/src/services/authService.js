import API from './api.js';

export const authService = {
  checkAdminExists: () => API.get('/auth/check-admin'),
  
  signup: (adminData) => API.post('/auth/signup', adminData),
  
  login: (credentials) => API.post('/auth/login', credentials),
  
  verifyToken: () => API.get('/auth/verify'),
  
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
  },
  
  saveToken: (token) => localStorage.setItem('adminToken', token),
  
  getToken: () => localStorage.getItem('adminToken'),
  
  saveAdmin: (admin) => localStorage.setItem('admin', JSON.stringify(admin)),
  
  getAdmin: () => {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  }
};