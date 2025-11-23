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

export const commentService = {
  // Get all comments
  getAll: async () => {
    const response = await api.get('/comments')
    return response.data
  },

  // Create new comment
  create: async (commentData) => {
    const response = await api.post('/comments', commentData)
    return response.data
  },
}

export default commentService