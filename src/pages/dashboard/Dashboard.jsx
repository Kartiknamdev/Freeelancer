import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiPlus, HiClock, HiDocumentText, HiCheckCircle, HiUserGroup } from 'react-icons/hi'
import { format } from 'date-fns'
import { useAuth } from '../../hooks/useAuth'
import { useTasks } from '../../hooks/useTasks'
import { motion } from 'framer-motion'

// Card component for dashboard stats
const StatCard = ({ icon: Icon, title, value, bgColor }) => (
  <motion.div 
    className={`${bgColor} rounded-xl shadow-card p-6`}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
  >
    <div className="flex items-start">
      <div className="p-2 rounded-lg bg-white bg-opacity-30">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-white opacity-90">{title}</h3>
        <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  </motion.div>
)

const Dashboard = () => {
  const { user } = useAuth()
  const { tasks, loading } = useTasks()
  const [stats, setStats] = useState({
    activeTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    earnings: 0 // for workers
  })
  
  useEffect(() => {
    if (!loading && tasks.length > 0) {
      // Calculate stats based on user type
      if (user?.userType === 'client') {
        const userTasks = tasks.filter(task => task.createdBy === user.id)
        setStats({
          activeTasks: userTasks.filter(task => task.status === 'assigned').length,
          pendingTasks: userTasks.filter(task => task.status === 'open').length,
          completedTasks: userTasks.filter(task => task.status === 'completed').length,
        })
      } else {
        // Worker stats
        const assignedTasks = tasks.filter(task => task.assignedTo === user.id)
        const appliedTasks = tasks.filter(task => 
          task.applicants.some(app => app.userId === user.id)
        )
        const completedTasks = assignedTasks.filter(task => task.status === 'completed')
        
        const totalEarnings = completedTasks.reduce((sum, task) => sum + task.budget, 0)
        
        setStats({
          activeTasks: assignedTasks.filter(task => task.status === 'assigned').length,
          pendingTasks: appliedTasks.filter(task => task.status === 'open').length,
          completedTasks: completedTasks.length,
          earnings: totalEarnings
        })
      }
    }
  }, [loading, tasks, user])

  // List of recent tasks
  const recentTasks = tasks
    .filter(task => {
      if (user?.userType === 'client') {
        return task.createdBy === user.id
      } else {
        return task.assignedTo === user.id || task.applicants.some(app => app.userId === user.id)
      }
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  // List of tasks in progress or recently updated
  const activeOrRecentTasks = tasks
    .filter(task => {
      if (user?.userType === 'client') {
        return task.createdBy === user.id && task.status === 'assigned'
      } else {
        return task.assignedTo === user.id && task.status === 'assigned'
      }
    })
    .sort((a, b) => new Date(b.assignedAt || b.createdAt) - new Date(a.assignedAt || a.createdAt))
    .slice(0, 3)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          {user?.userType === 'client' 
            ? 'Manage your document tasks and track progress' 
            : 'Find tasks and manage your ongoing work'}
        </p>
      </div>
      
      {/* Quick actions */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user?.userType === 'client' ? (
            <Link 
              to="/create-task"
              className="bg-primary-600 text-white rounded-xl p-4 shadow-sm hover:bg-primary-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <HiPlus className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Create New Task</h3>
                  <p className="text-sm text-primary-100">Post a new document task</p>
                </div>
              </div>
            </Link>
          ) : (
            <Link 
              to="/browse-tasks"
              className="bg-primary-600 text-white rounded-xl p-4 shadow-sm hover:bg-primary-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <HiDocumentText className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Find Tasks</h3>
                  <p className="text-sm text-primary-100">Browse available document tasks</p>
                </div>
              </div>
            </Link>
          )}
          
          <Link 
            to="/messages"
            className="bg-secondary-600 text-white rounded-xl p-4 shadow-sm hover:bg-secondary-700 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <HiUserGroup className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Messages</h3>
                <p className="text-sm text-secondary-100">
                  {user?.userType === 'client' 
                    ? 'Communicate with your workers' 
                    : 'Communicate with clients'}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={HiClock}
            title="Active Tasks"
            value={stats.activeTasks}
            bgColor="bg-primary-600"
          />
          <StatCard 
            icon={HiDocumentText}
            title="Pending Tasks"
            value={stats.pendingTasks}
            bgColor="bg-secondary-600"
          />
          <StatCard 
            icon={HiCheckCircle}
            title="Completed Tasks"
            value={stats.completedTasks}
            bgColor="bg-accent-600"
          />
          {user?.userType === 'worker' && (
            <StatCard 
              icon={HiPlus}
              title="Total Earnings"
              value={`$${stats.earnings}`}
              bgColor="bg-success-700"
            />
          )}
        </div>
      </div>
      
      {/* Tasks in progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Tasks in Progress</h2>
          <Link to="/history" className="text-sm text-primary-600 hover:text-primary-800">
            View all
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          {activeOrRecentTasks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No active tasks found
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {activeOrRecentTasks.map((task) => (
                <li key={task.id}>
                  <Link 
                    to={`/tasks/${task.id}`}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </p>
                        <div className="badge-primary ml-2">
                          {task.status === 'assigned' ? 'In Progress' : task.status}
                        </div>
                      </div>
                      <div className="flex mt-2 justify-between">
                        <div className="text-xs text-gray-500">
                          Deadline: {format(new Date(task.deadline), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-gray-500">
                          Budget: ${task.budget}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Link to="/history" className="text-sm text-primary-600 hover:text-primary-800">
            View all
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          {recentTasks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No recent activity found
            </div>
          ) : (
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentTasks.map((task) => (
                  <li key={task.id}>
                    <Link 
                      to={`/tasks/${task.id}`}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <div className={`
                            badge
                            ${task.status === 'open' ? 'badge-primary' : ''}
                            ${task.status === 'assigned' ? 'badge-warning' : ''}
                            ${task.status === 'completed' ? 'badge-success' : ''}
                          `}>
                            {task.status === 'open' ? 'Open' : 
                             task.status === 'assigned' ? 'In Progress' : 'Completed'}
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 truncate">
                          {task.description.substring(0, 100)}...
                        </p>
                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                          <span>Created {format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
                          <span>${task.budget}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard