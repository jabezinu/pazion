import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const courseService = {
  // Get all courses
  getAll: async () => {
    const response = await api.get('/courses')
    return response.data
  },
}

export default courseService