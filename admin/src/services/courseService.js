import axios from '../utils/axiosConfig'

export const courseService = {
  // Get all courses
  getAll: async () => {
    const response = await axios.get('/courses')
    return response.data
  },

  // Get single course by ID
  getById: async (id) => {
    const response = await axios.get(`/courses/${id}`)
    return response.data
  },

  // Create new course
  create: async (courseData) => {
    const response = await axios.post('/courses', courseData)
    return response.data
  },

  // Update course
  update: async (id, courseData) => {
    const response = await axios.put(`/courses/${id}`, courseData)
    return response.data
  },

  // Delete course
  delete: async (id) => {
    const response = await axios.delete(`/courses/${id}`)
    return response.data
  },
}

export default courseService