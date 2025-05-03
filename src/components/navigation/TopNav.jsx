import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiMenuAlt1, HiBell, HiLogout } from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../hooks/useNotifications'
import { motion, AnimatePresence } from 'framer-motion'

const TopNav = ({ openSidebar }) => {
  const { user, logout } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={openSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <HiMenuAlt1 className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex items-center">
            {/* Notifications dropdown */}
            <div className="relative mr-4" ref={notificationsRef}>
              <button
                type="button"
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="sr-only">View notifications</span>
                <HiBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="py-2 px-4 flex justify-between items-center border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      {notifications.length > 0 && (
                        <button 
                          className="text-xs text-primary-600 hover:text-primary-800"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto py-1">
                      {notifications.length === 0 ? (
                        <p className="py-4 px-4 text-sm text-gray-500 text-center">
                          No notifications yet
                        </p>
                      ) : (
                        notifications.slice(0, 5).map((notification) => (
                          <div 
                            key={notification.id}
                            className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-primary-50' : ''}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <p className="text-sm text-gray-800">{notification.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {notifications.length > 0 && (
                      <div className="py-2 px-4 border-t border-gray-100">
                        <Link 
                          to="#view-all"
                          className="text-xs text-primary-600 hover:text-primary-800"
                          onClick={() => setNotificationsOpen(false)}
                        >
                          View all notifications
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                className="flex items-center focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user?.avatar || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"}
                  alt="User avatar"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.name || 'User'}
                </span>
              </button>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                        }}
                      >
                        <HiLogout className="mr-2 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNav