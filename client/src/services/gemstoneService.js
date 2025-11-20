import axios from 'axios'
import { API_BASE_URL } from '../config.js'

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
}

export default gemstoneService
