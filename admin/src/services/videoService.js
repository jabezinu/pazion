import axios from '../utils/axiosConfig'

export const videoService = {
  // Get all videos sorted by newest first
  getAll: async () => {
    const response = await axios.get('/videos?sort=-createdAt')
    return response.data
  },

  // Get single video by ID
  getById: async (id) => {
    const response = await axios.get(`/videos/${id}`)
    return response.data
  },

  // Create new video
  create: async (videoData) => {
    const response = await axios.post('/videos', videoData)
    return response.data
  },

  // Update video
  update: async (id, videoData) => {
    const response = await axios.put(`/videos/${id}`, videoData)
    return response.data
  },

  // Delete video
  delete: async (id) => {
    const response = await axios.delete(`/videos/${id}`)
    return response.data
  },
}

export default videoService