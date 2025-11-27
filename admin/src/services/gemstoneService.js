import axios from '../utils/axiosConfig'

export const gemstoneService = {
  // Get all gemstones
  getAll: async () => {
    const response = await axios.get('/gemstones')
    return response.data
  },

  // Get single gemstone by ID
  getById: async (id) => {
    const response = await axios.get(`/gemstones/${id}`)
    return response.data
  },

  // Create new gemstone
  create: async (gemstoneData) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(gemstoneData).forEach(key => {
      if (key === 'image' && gemstoneData[key] instanceof File) {
        formData.append('image', gemstoneData[key])
      } else if (gemstoneData[key] !== null && gemstoneData[key] !== undefined) {
        formData.append(key, gemstoneData[key])
      }
    })

    const response = await axios.post('/gemstones', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Update gemstone
  update: async (id, gemstoneData) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(gemstoneData).forEach(key => {
      if (key === 'image' && gemstoneData[key] instanceof File) {
        formData.append('image', gemstoneData[key])
      } else if (gemstoneData[key] !== null && gemstoneData[key] !== undefined) {
        formData.append(key, gemstoneData[key])
      }
    })

    const response = await axios.put(`/gemstones/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Delete gemstone
  delete: async (id) => {
    const response = await axios.delete(`/gemstones/${id}`)
    return response.data
  },
}

export default gemstoneService