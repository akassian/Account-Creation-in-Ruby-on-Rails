import axios from 'axios';
import { getCsrfToken } from './csrfToken';

const axiosInstance = axios.create();

const csrfToken = getCsrfToken();

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['X-CSRF-Token'] = csrfToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;