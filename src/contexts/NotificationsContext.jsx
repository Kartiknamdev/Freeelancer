import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const NotificationsContext = createContext(null)

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Load notifications on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('docu_notifications')
    
    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications)
      setNotifications(parsedNotifications)
      setUnreadCount(parsedNotifications.filter(n => !n.read).length)
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('docu_notifications', JSON.stringify(notifications))
    setUnreadCount(notifications.filter(n => !n.read).length)
  }, [notifications])

  // Add a notification
  const addNotification = (notification) => {
    const newNotification = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    }
    
    setNotifications(prev => [newNotification, ...prev])
    return newNotification
  }

  // Mark a notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  // Delete a notification
  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    )
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}