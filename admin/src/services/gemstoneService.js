import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const gemstoneService = {
  // Get all gemstones
  getAll: async () => {
    const response = await api.get('/gemstones')
    return response.data
  },

  // Get single gemstone by ID
  getById: async (id) => {
    const response = await api.get(`/gemstones/${id}`)
    return response.data
  },

  // Create new gemstone
  create: async (gemstoneData) => {
    const response = await api.post('/gemstones', gemstoneData)
    return response.data
  },

  // Update gemstone
  update: async (id, gemstoneData) => {
    const response = await api.put(`/gemstones/${id}`, gemstoneData)
    return response.data
  },

  // Delete gemstone
  delete: async (id) => {
    const response = await api.delete(`/gemstones/${id}`)
    return response.data
  },
}

export default gemstoneService