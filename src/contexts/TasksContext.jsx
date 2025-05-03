import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { mockTasks } from '../data/mockData'

export const TasksContext = createContext(null)

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // Load tasks on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('docu_tasks')
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      // Use mock data initially
      setTasks(mockTasks)
      localStorage.setItem('docu_tasks', JSON.stringify(mockTasks))
    }
    
    setLoading(false)
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('docu_tasks', JSON.stringify(tasks))
    }
  }, [tasks, loading])

  // Create a new task
  const createTask = (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: uuidv4(),
          ...taskData,
          status: 'open',
          createdAt: new Date().toISOString(),
          applicants: [],
          assignedTo: null,
          completedAt: null,
          paymentStatus: 'pending'
        }
        
        setTasks(prevTasks => [...prevTasks, newTask])
        resolve(newTask)
      }, 800) // Simulate API delay
    })
  }

  // Get a task by ID
  const getTaskById = (taskId) => {
    return tasks.find(task => task.id === taskId)
  }

  // Update a task
  const updateTask = (taskId, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId
              ? { ...task, ...updatedData }
              : task
          )
        )
        resolve({ id: taskId, ...updatedData })
      }, 500) // Simulate API delay
    })
  }

  // Apply for a task
  const applyForTask = (taskId, userId, coverLetter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTasks(prevTasks => 
          prevTasks.map(task => {
            if (task.id === taskId) {
              const application = {
                userId,
                appliedAt: new Date().toISOString(),
                coverLetter,
                status: 'pending'
              }
              
              // Don't allow duplicate applications
              if (!task.applicants.some(app => app.userId === userId)) {
                return {
                  ...task,
                  applicants: [...task.applicants, application]
                }
              }
            }
            return task
          })
        )
        resolve({ success: true })
      }, 500) // Simulate API delay
    })
  }

  // Assign a task to a worker
  const assignTask = (taskId, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId
              ? { 
                  ...task, 
                  assignedTo: userId,
                  status: 'assigned',
                  assignedAt: new Date().toISOString()
                }
              : task
          )
        )
        resolve({ success: true })
      }, 500) // Simulate API delay
    })
  }

  // Mark a task as completed
  const completeTask = (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId
              ? { 
                  ...task, 
                  status: 'completed',
                  completedAt: new Date().toISOString()
                }
              : task
          )
        )
        resolve({ success: true })
      }, 500) // Simulate API delay
    })
  }

  // Mark a payment as processed
  const processPayment = (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId
              ? { 
                  ...task, 
                  paymentStatus: 'paid',
                  paidAt: new Date().toISOString()
                }
              : task
          )
        )
        resolve({ success: true })
      }, 500) // Simulate API delay
    })
  }

  // Get tasks by creator
  const getTasksByCreator = (userId) => {
    return tasks.filter(task => task.createdBy === userId)
  }

  // Get tasks assigned to a worker
  const getTasksByWorker = (userId) => {
    return tasks.filter(task => task.assignedTo === userId)
  }

  // Get tasks that a user has applied to
  const getTasksAppliedTo = (userId) => {
    return tasks.filter(task => 
      task.applicants.some(applicant => applicant.userId === userId)
    )
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        createTask,
        getTaskById,
        updateTask,
        applyForTask,
        assignTask,
        completeTask,
        processPayment,
        getTasksByCreator,
        getTasksByWorker,
        getTasksAppliedTo
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}