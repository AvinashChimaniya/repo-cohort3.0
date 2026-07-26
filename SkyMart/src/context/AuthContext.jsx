import { createContext, useContext, useEffect, useState } from 'react'
import { authenticateUser, registerUser } from './authUtils.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('skymart_user')
    return stored && stored !== 'undefined' ? JSON.parse(stored) : null
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('skymart_isAuthenticated') === 'true'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (user) {
      localStorage.setItem('skymart_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('skymart_user')
    }
  }, [user])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('skymart_isAuthenticated', isAuthenticated ? 'true' : 'false')
  }, [isAuthenticated])

  const login = ({ email, password }) => {
    const result = authenticateUser({ email, password })

    if (!result.success) {
      return result
    }

    setUser(result.user)
    setIsAuthenticated(true)
    return result
  }

  const register = ({ name, email, password }) => {
    const result = registerUser({ name, email, password })

    if (!result.success) {
      return result
    }

    setUser(result.user)
    setIsAuthenticated(true)
    return result
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default AuthContext
