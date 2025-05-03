import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useAuth } from './hooks/useAuth'

// Layouts
import DashboardLayout from './layouts/DashboardLayout'
import AuthLayout from './layouts/AuthLayout'
import LoadingScreen from './components/ui/LoadingScreen'

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))

// Dashboard Pages
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const CreateTask = lazy(() => import('./pages/dashboard/CreateTask'))
const BrowseTasks = lazy(() => import('./pages/dashboard/BrowseTasks'))
const TaskDetails = lazy(() => import('./pages/dashboard/TaskDetails'))
const Profile = lazy(() => import('./pages/dashboard/Profile'))
const Messages = lazy(() => import('./pages/dashboard/Messages'))
const Conversation = lazy(() => import('./pages/dashboard/Conversation'))
const TaskHistory = lazy(() => import('./pages/dashboard/TaskHistory'))
const Settings = lazy(() => import('./pages/dashboard/Settings'))

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingScreen />
  
  if (!user) return <Navigate to="/login" replace />
  
  return children
}

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        
        {/* Dashboard Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="browse-tasks" element={<BrowseTasks />} />
          <Route path="tasks/:taskId" element={<TaskDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<Conversation />} />
          <Route path="history" element={<TaskHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App