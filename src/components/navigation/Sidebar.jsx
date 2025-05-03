import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HiX, 
  HiHome, 
  HiDocumentAdd, 
  HiDocumentSearch, 
  HiClipboardList,
  HiUser, 
  HiChatAlt, 
  HiCog 
} from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../ui/Logo'

const Sidebar = ({ isMobileOpen, closeMobileSidebar }) => {
  const { user } = useAuth()
  
  // Animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'tween' } },
    closed: { x: '-100%', transition: { type: 'tween' } }
  }
  
  // Navigation items
  const navItems = [
    { name: 'Dashboard', to: '/', icon: HiHome },
    { name: 'Create Task', to: '/create-task', icon: HiDocumentAdd, role: 'client' },
    { name: 'Browse Tasks', to: '/browse-tasks', icon: HiDocumentSearch },
    { name: 'Task History', to: '/history', icon: HiClipboardList },
    { name: 'Messages', to: '/messages', icon: HiChatAlt },
    { name: 'Profile', to: '/profile', icon: HiUser },
    { name: 'Settings', to: '/settings', icon: HiCog }
  ]
  
  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    !item.role || !user || item.role === user.userType
  )

  return (
    <>
      {/* Mobile sidebar */}
      <motion.div
        className={`lg:hidden fixed inset-y-0 left-0 flex flex-col z-30 w-72 bg-white shadow-xl`}
        variants={sidebarVariants}
        animate={isMobileOpen ? 'open' : 'closed'}
        initial="closed"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Logo />
          <button 
            onClick={closeMobileSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <span className="sr-only">Close sidebar</span>
            <HiX className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 px-2 space-y-1">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
              <Logo />
            </div>
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {filteredNavItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar