import axios from 'axios'
import { API_BASE_URL } from '../config.js'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add authentication token to all requests and cache-busting for GET requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Add cache-busting for GET requests
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: Date.now()
    };
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

export const videoService = {
  // Get all videos sorted by newest first
  getAll: async () => {
    const response = await api.get('/videos?sort=-createdAt')
    return response.data
  },

  // Get single video by ID
  getById: async (id) => {
    const response = await api.get(`/videos/${id}`)
    return response.data
  },

  // Create new video
  create: async (videoData) => {
    const response = await api.post('/videos', videoData)
    return response.data
  },

  // Update video
  update: async (id, videoData) => {
    const response = await api.put(`/videos/${id}`, videoData)
    return response.data
  },

  // Delete video
  delete: async (id) => {
    const response = await api.delete(`/videos/${id}`)
    return response.data
  },
}

export default videoService