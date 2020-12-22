import { Endpoints } from "constant"
import React, { createContext, useContext, useState } from "react"
import { apiClient } from "utils"
import { useError } from "./ErrorProvider"

interface AuthContextInterface {
  user: User | null
  isAuthenticated: boolean | null
  isLoading: boolean
  loadUser: () => void
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isInit: boolean
  register: (username: string, password: string, name: string) => Promise<void>
}

export const AuthContext = createContext<Partial<AuthContextInterface>>({})

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInit, setIsInit] = useState(true)
  const { addError } = useError()

  const loadUser = async () => {
    setIsLoading(true)
    const response = await apiClient.get(Endpoints.User)
    if (response.success) {
      setUser(response.data)
      setIsAuthenticated(true)
    }
    if (response.error) {
      localStorage.removeItem("token")
      setUser(null)
      setIsAuthenticated(false)
    }
    setIsLoading(false)
    setIsInit(false)
  }

  const login = async (username: string, password: string) => {
    const response = await apiClient.post(Endpoints.Login, {
      body: { username, password },
    })

    if (response.success) {
      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)
      setIsAuthenticated(true)
    }

    if (response.error) {
      localStorage.removeItem("token")
      addError(response.data, response.status)
      setUser(null)
      setIsAuthenticated(false)
      throw response.data
    }
  }
  const register = async (username: string, password: string, name: string) => {
    const response = await apiClient.post(Endpoints.Register, {
      body: { username, password, name },
    })

    if (response.success) {
      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)
      setIsAuthenticated(true)
    }

    if (response.error) {
      localStorage.removeItem("token")
      addError(response.data, response.status)
      setUser(null)
      setIsAuthenticated(false)
      throw response.data
    }
  }

  const logout = async () => {
    const response = await apiClient.post(Endpoints.Logout, { body: null })
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
    if (response.error) {
      addError(response.data, response.status)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        loadUser,
        login,
        logout,
        isInit,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
