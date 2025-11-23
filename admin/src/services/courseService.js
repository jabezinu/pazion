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

export const courseService = {
  // Get all courses
  getAll: async () => {
    const response = await api.get('/courses')
    return response.data
  },

  // Get single course by ID
  getById: async (id) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  // Create new course
  create: async (courseData) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(courseData).forEach(key => {
      if (key === 'image' && courseData[key] instanceof File) {
        formData.append('image', courseData[key])
      } else if (courseData[key] !== null && courseData[key] !== undefined) {
        formData.append(key, courseData[key])
      }
    })

    const response = await api.post('/courses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Update course
  update: async (id, courseData) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(courseData).forEach(key => {
      if (key === 'image' && courseData[key] instanceof File) {
        formData.append('image', courseData[key])
      } else if (courseData[key] !== null && courseData[key] !== undefined) {
        formData.append(key, courseData[key])
      }
    })

    const response = await api.put(`/courses/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Delete course
  delete: async (id) => {
    const response = await api.delete(`/courses/${id}`)
    return response.data
  },
}

export default courseService