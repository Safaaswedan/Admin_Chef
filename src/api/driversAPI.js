import axiosInstance from './axiosConfig';
import { mockDriversAPI } from './mockAPI';

const USE_MOCK_API = true;

export const driversAPI = USE_MOCK_API ? mockDriversAPI : {
  getAll: (params) => axiosInstance.get('/drivers', { params }).then(res => res.data),
  getById: (id) => axiosInstance.get(`/drivers/${id}`).then(res => res.data),
  create: (data) => axiosInstance.post('/drivers', data).then(res => res.data),
  update: (id, data) => axiosInstance.put(`/drivers/${id}`, data).then(res => res.data),
  delete: (id) => axiosInstance.delete(`/drivers/${id}`).then(res => res.data),
  updateStatus: (id, status) => axiosInstance.patch(`/drivers/${id}/status`, { status }).then(res => res.data),
};