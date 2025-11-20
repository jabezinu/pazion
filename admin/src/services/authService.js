import axios from 'axios'
import { API_BASE_URL } from '../config'

const API_URL = `${API_BASE_URL}/auth`

const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password })
    return response.data
  },

  verifyToken: async () => {
    const response = await axios.get(`${API_URL}/verify`, {
      headers: getAuthHeader()
    })
    return response.data
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await axios.post(
      `${API_URL}/change-password`,
      { currentPassword, newPassword },
      { headers: getAuthHeader() }
    )
    return response.data
  }
}
