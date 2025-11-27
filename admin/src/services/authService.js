import axios from '../utils/axiosConfig'

export const authService = {
  login: async (username, password) => {
    const response = await axios.post('/auth/login', { username, password })
    return response.data
  },

  verifyToken: async () => {
    const response = await axios.get('/auth/verify')
    return response.data
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await axios.post('/auth/change-password', {
      currentPassword,
      newPassword
    })
    return response.data
  }
}
