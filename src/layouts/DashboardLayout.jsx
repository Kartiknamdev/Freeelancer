import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import TopNav from '../components/navigation/TopNav'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from '../hooks/useNotifications'
import { motion } from 'framer-motion'

const DashboardLayout = () => {
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  // Add demo notification on first load
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        addNotification({
          type: 'info',
          content: 'Welcome to DocuTask! This is a demo platform.',
          actionLabel: 'Explore',
          onAction: () => navigate('/browse-tasks')
        })
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [user, addNotification, navigate])

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 8, transition: { duration: 0.2 } }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar component */}
      <Sidebar
        isMobileOpen={sidebarOpen}
        closeMobileSidebar={() => setSidebarOpen(false)}
      />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top navigation */}
        <TopNav openSidebar={() => setSidebarOpen(true)} />
        
        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <motion.div 
            className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout