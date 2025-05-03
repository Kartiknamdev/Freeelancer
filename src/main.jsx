import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { TasksProvider } from './contexts/TasksContext.jsx'
import { NotificationsProvider } from './contexts/NotificationsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TasksProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)