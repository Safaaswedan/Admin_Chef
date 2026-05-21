// src/api/requestsAPI.js
import axiosInstance from './axiosConfig';
import { mockRequestsAPI } from './mockAPI';

const USE_MOCK_API = true; // غير إلى false عند توفر API حقيقي

export const requestsAPI = USE_MOCK_API ? mockRequestsAPI : {
  // طلبات الطهاة
  getPendingChefRequests: () => axiosInstance.get('/requests/chefs/pending').then(res => res.data),
  getChefRequestById: (id) => axiosInstance.get(`/requests/chefs/${id}`).then(res => res.data),
  approveChefRequest: (id) => axiosInstance.post(`/requests/chefs/${id}/approve`).then(res => res.data),
  rejectChefRequest: (id, reason) => axiosInstance.post(`/requests/chefs/${id}/reject`, { reason }).then(res => res.data),
  
  // طلبات السائقين
  getPendingDriverRequests: () => axiosInstance.get('/requests/drivers/pending').then(res => res.data),
  getDriverRequestById: (id) => axiosInstance.get(`/requests/drivers/${id}`).then(res => res.data),
  approveDriverRequest: (id) => axiosInstance.post(`/requests/drivers/${id}/approve`).then(res => res.data),
  rejectDriverRequest: (id, reason) => axiosInstance.post(`/requests/drivers/${id}/reject`, { reason }).then(res => res.data),
  
  // إحصائيات
  getRequestsStats: () => axiosInstance.get('/requests/stats').then(res => res.data),
};