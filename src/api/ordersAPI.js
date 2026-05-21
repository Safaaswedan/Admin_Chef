import axiosInstance from './axiosConfig';
import { mockOrdersAPI } from './mockAPI';

const USE_MOCK_API = true;

export const ordersAPI = USE_MOCK_API ? mockOrdersAPI : {
  getAll: (params) => axiosInstance.get('/orders', { params }).then(res => res.data),
  getById: (id) => axiosInstance.get(`/orders/${id}`).then(res => res.data),
  updateStatus: (id, status) => axiosInstance.patch(`/orders/${id}/status`, { status }).then(res => res.data),
  assignDriver: (id, driverId) => axiosInstance.patch(`/orders/${id}/assign-driver`, { driverId }).then(res => res.data),
  getRecent: (limit) => axiosInstance.get('/orders/recent', { params: { limit } }).then(res => res.data),
};