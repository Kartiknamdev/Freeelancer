import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiPlus, HiClock, HiDocumentText, HiCheckCircle, HiUserGroup } from 'react-icons/hi';
import { motion } from 'framer-motion';

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
);

const Dashboard = () => {
  const user = 'client'; // Placeholder for user type
  const [stats] = useState({
    activeTasks: 2,
    pendingTasks: 2,
    completedTasks: 2,
    earnings: 232, // For workers
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          {user === 'client' 
            ? 'Manage your document tasks and track progress' 
            : 'Find tasks and manage your ongoing work'}
        </p>
      </div>
      
      {/* Quick actions */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user === 'client' ? (
            <Link 
              to="/dashboardLayout/create-task"
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
              to="/dashboardLayout/browse-tasks"
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
            to="/dashboardLayout/messages"
            className="bg-secondary-600 text-white rounded-xl p-4 shadow-sm hover:bg-secondary-700 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <HiUserGroup className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Messages</h3>
                <p className="text-sm text-secondary-100">
                  {user === 'client' 
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
          {user === 'worker' && (
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
          <Link to="/dashboardLayout/history" className="text-sm text-primary-600 hover:text-primary-800">
            View all
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="p-6 text-center text-gray-500">
            No active tasks found
          </div>
        </div>
      </div>
      
      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Link to="/dashboardLayout/history" className="text-sm text-primary-600 hover:text-primary-800">
            View all
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="p-6 text-center text-gray-500">
            No recent activity found
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;