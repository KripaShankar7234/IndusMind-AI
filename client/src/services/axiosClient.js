import axios from 'axios';

// Base Axios instance configured for IndusMind AI Enterprise Backend
const axiosClient = axios.create({
  baseURL: 'https://api.indusmind.ai/v1', // Mock Base API endpoint
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Platform': 'IndusMind-Web-Enterprise'
  }
});

// Request Interceptor to attach Authorization Header & Organization ID
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('indusmind_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const orgId = localStorage.getItem('indusmind_org_id') || 'ORG-INDUS-9941';
    config.headers['X-Organization-ID'] = orgId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for handling enterprise errors & refresh logic
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional auto-logout on token expiration
      console.warn('Unauthorized access. Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
