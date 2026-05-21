import axiosInstance from './axiosConfig';
import { mockChefsAPI } from './mockAPI';

const USE_MOCK_API = true;

export const chefsAPI = USE_MOCK_API ? mockChefsAPI : {
  getAll: (params) => axiosInstance.get('/chefs', { params }).then(res => res.data),
  getById: (id) => axiosInstance.get(`/chefs/${id}`).then(res => res.data),
  create: (data) => axiosInstance.post('/chefs', data).then(res => res.data),
  update: (id, data) => axiosInstance.put(`/chefs/${id}`, data).then(res => res.data),
  delete: (id) => axiosInstance.delete(`/chefs/${id}`).then(res => res.data),
  updateStatus: (id, status) => axiosInstance.patch(`/chefs/${id}/status`, { status }).then(res => res.data),
};