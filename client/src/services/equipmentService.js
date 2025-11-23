import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  },
})

// Add cache-busting for GET requests
api.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: Date.now()
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const equipmentService = {
  // Get all equipments
  getAll: async () => {
    const response = await api.get('/equipments')
    return response.data
  },
}

export default equipmentService