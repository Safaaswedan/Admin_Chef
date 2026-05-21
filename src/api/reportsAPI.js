import axiosInstance from './axiosConfig';
import { mockReportsAPI } from './mockAPI';

const USE_MOCK_API = true;

export const reportsAPI = USE_MOCK_API ? mockReportsAPI : {
  getChefsReport: (period) => axiosInstance.get('/reports/chefs', { params: { period } }).then(res => res.data),
  getDriversReport: (period) => axiosInstance.get('/reports/drivers', { params: { period } }).then(res => res.data),
  getFinancialReport: (period) => axiosInstance.get('/reports/financial', { params: { period } }).then(res => res.data),
};