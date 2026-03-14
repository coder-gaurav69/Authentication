import axios from 'axios';

let baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// Ensure it ends with /api/v1 if not present
if (baseURL && !baseURL.endsWith('/api/v1') && !baseURL.endsWith('/api/v1/')) {
  baseURL = baseURL.replace(/\/$/, '') + '/api/v1';
}

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
