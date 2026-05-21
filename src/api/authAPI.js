import axiosInstance from './axiosConfig';
import { mockAuthAPI } from './mockAPI';

const USE_MOCK_API = true; // غير إلى false عند توفر API حقيقي

export const authAPI = USE_MOCK_API ? mockAuthAPI : {
  login: (email, password) => axiosInstance.post('/auth/login', { email, password }).then(res => res.data),
  logout: () => axiosInstance.post('/auth/logout').then(res => res.data),
  getProfile: () => axiosInstance.get('/auth/profile').then(res => res.data),
};