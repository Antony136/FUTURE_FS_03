import api from './axios';

export const menuAPI = {
  getAll: (params) => api.get('/menu', { params }),
  getById: (id) => api.get(`/menu/${id}`),
  getCategories: () => api.get('/menu/categories'),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
};

export const reservationAPI = {
  create: (data) => api.post('/reservations', data),
  getAll: (params) => api.get('/reservations', { params }),
  getMyReservations: () => api.get('/reservations/my-reservations'),
  getById: (id) => api.get(`/reservations/${id}`),
  updateStatus: (id, status) => api.patch(`/reservations/${id}/status`, { status }),
  delete: (id) => api.delete(`/reservations/${id}`),
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/myorders'),
  getAll: () => api.get('/orders'),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
  delete: (id) => api.delete(`/contact/${id}`),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  uploadImage: (formData) => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};
