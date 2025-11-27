import axios from '../utils/axiosConfig'

export const equipmentService = {
  // Get all equipments
  getAll: async () => {
    const response = await axios.get('/equipments')
    return response.data
  },

  // Get single equipment by ID
  getById: async (id) => {
    const response = await axios.get(`/equipments/${id}`)
    return response.data
  },

  // Create new equipment
  create: async (equipmentData) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(equipmentData).forEach(key => {
      if (key === 'image' && equipmentData[key] instanceof File) {
        formData.append('image', equipmentData[key])
      } else if (equipmentData[key] !== null && equipmentData[key] !== undefined) {
        formData.append(key, equipmentData[key])
      }
    })

    const response = await axios.post('/equipments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Update equipment
  update: async (id, equipmentData) => {
    const formData = new FormData()

    // Add all fields to FormData
    Object.keys(equipmentData).forEach(key => {
      if (key === 'image' && equipmentData[key] instanceof File) {
        formData.append('image', equipmentData[key])
      } else if (equipmentData[key] !== null && equipmentData[key] !== undefined) {
        formData.append(key, equipmentData[key])
      }
    })

    const response = await axios.put(`/equipments/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Delete equipment
  delete: async (id) => {
    const response = await axios.delete(`/equipments/${id}`)
    return response.data
  },
}

export default equipmentService