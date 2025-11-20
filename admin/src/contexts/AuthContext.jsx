import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import { clearDataCache } from './DataContext'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      try {
        const data = await authService.verifyToken()
        setAdmin(data.admin)
      } catch (error) {
        localStorage.removeItem('adminToken')
      }
    }
    setLoading(false)
  }

  const login = async (username, password) => {
    const data = await authService.login(username, password)
    localStorage.setItem('adminToken', data.token)
    setAdmin(data.admin)
    return data
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setAdmin(null)
    // Clear cached data on logout
    clearDataCache()
  }

  const changePassword = async (currentPassword, newPassword) => {
    await authService.changePassword(currentPassword, newPassword)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, changePassword, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
