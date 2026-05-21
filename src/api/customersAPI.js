import axiosInstance from './axiosConfig';
import { mockCustomersAPI } from './mockAPI';

const USE_MOCK_API = true;

export const customersAPI = USE_MOCK_API ? mockCustomersAPI : {
  getAll: (params) => axiosInstance.get('/customers', { params }).then(res => res.data),
  getById: (id) => axiosInstance.get(`/customers/${id}`).then(res => res.data),
  updateStatus: (id, status) => axiosInstance.patch(`/customers/${id}/status`, { status }).then(res => res.data),
  getCustomerOrders: (customerId) => axiosInstance.get(`/customers/${customerId}/orders`).then(res => res.data),
};