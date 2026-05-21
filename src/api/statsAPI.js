import axiosInstance from './axiosConfig';
import { mockStatsAPI } from './mockAPI';

const USE_MOCK_API = true;

export const statsAPI = USE_MOCK_API ? mockStatsAPI : {
  getDashboardStats: () => axiosInstance.get('/stats/dashboard').then(res => res.data),
  getMonthlyRevenue: () => axiosInstance.get('/stats/monthly-revenue').then(res => res.data),
  getOrdersByStatus: () => axiosInstance.get('/stats/orders-by-status').then(res => res.data),
  getTopChefs: () => axiosInstance.get('/stats/top-chefs').then(res => res.data),
  getTopCustomers: () => axiosInstance.get('/stats/top-customers').then(res => res.data),
};