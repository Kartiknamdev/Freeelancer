import { createContext, useState, useEffect } from 'react'
import { mockUsers } from '../data/mockData'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('docu_task_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Mock login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(user => 
          user.email === email && user.password === password
        )
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
          localStorage.setItem('docu_task_user', JSON.stringify(userWithoutPassword))
          resolve(userWithoutPassword)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 800) // Simulate API delay
    })
  }

  // Mock register function
  const register = (name, email, password, userType) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email already exists
        const emailExists = mockUsers.some(user => user.email === email)
        
        if (emailExists) {
          reject(new Error('Email already in use'))
          return
        }
        
        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          password, // In a real app, this would be hashed
          userType,
          avatar: null,
          createdAt: new Date().toISOString(),
          rating: 0,
          completedTasks: 0
        }
        
        // In a real app, this would be an API call to create the user
        const { password: _, ...userWithoutPassword } = newUser
        setUser(userWithoutPassword)
        localStorage.setItem('docu_task_user', JSON.stringify(userWithoutPassword))
        resolve(userWithoutPassword)
      }, 800) // Simulate API delay
    })
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem('docu_task_user')
  }

  const updateProfile = (updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...updatedData }
        setUser(updatedUser)
        localStorage.setItem('docu_task_user', JSON.stringify(updatedUser))
        resolve(updatedUser)
      }, 500)
    })
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}