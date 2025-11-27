import axios from '../utils/axiosConfig'

export const contactMessageService = {
  // Get all contact messages
  getAll: async () => {
    const response = await axios.get('/contact-messages')
    return response.data
  },

  // Get single contact message by ID
  getById: async (id) => {
    const response = await axios.get(`/contact-messages/${id}`)
    return response.data
  },

  // Create new contact message
  create: async (messageData) => {
    const response = await axios.post('/contact-messages', messageData)
    return response.data
  },

  // Update contact message
  update: async (id, messageData) => {
    const response = await axios.put(`/contact-messages/${id}`, messageData)
    return response.data
  },

  // Delete contact message
  delete: async (id) => {
    const response = await axios.delete(`/contact-messages/${id}`)
    return response.data
  },
}

export default contactMessageService