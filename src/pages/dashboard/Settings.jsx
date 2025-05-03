import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiShieldCheck, HiBell, HiLockClosed, HiCreditCard, HiOutlineExclamationCircle } from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../hooks/useNotifications'

const Settings = () => {
  const { logout } = useAuth()
  const { addNotification } = useNotifications()
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskUpdates, setTaskUpdates] = useState(true)
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  
  // Password change form
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match")
      return
    }
    
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }
    
    // In a real app, this would make an API call
    setLoading(true)
    
    setTimeout(() => {
      setPasswordSuccess('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setLoading(false)
      
      addNotification({
        type: 'success',
        content: 'Your password has been updated successfully.'
      })
    }, 1000)
  }
  
  // Handle notification settings change
  const saveNotificationSettings = () => {
    // In a real app, this would make an API call
    addNotification({
      type: 'success',
      content: 'Notification settings updated successfully.'
    })
  }
  
  // Handle account deletion
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const handleDeleteAccount = () => {
    // In a real app, this would make an API call
    logout()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <nav className="divide-y divide-gray-200">
              <a href="#notifications" className="block p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <HiBell className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Notifications</span>
                </div>
              </a>
              <a href="#security" className="block p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <HiShieldCheck className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Security & Password</span>
                </div>
              </a>
              <a href="#payment" className="block p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <HiCreditCard className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Payment Methods</span>
                </div>
              </a>
              <a href="#danger" className="block p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <HiOutlineExclamationCircle className="h-5 w-5 text-error-500 mr-2" />
                  <span className="text-sm font-medium text-error-600">Danger Zone</span>
                </div>
              </a>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Notifications section */}
          <div id="notifications" className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <HiBell className="h-5 w-5 mr-2 text-gray-500" />
              Notification Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-xs text-gray-500">Receive email notifications for important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Task Updates</h3>
                  <p className="text-xs text-gray-500">Receive notifications about task status changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={taskUpdates}
                    onChange={() => setTaskUpdates(!taskUpdates)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Message Notifications</h3>
                  <p className="text-xs text-gray-500">Receive notifications for new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={messageNotifications}
                    onChange={() => setMessageNotifications(!messageNotifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
                  <p className="text-xs text-gray-500">Receive updates about new features and promotions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={marketingEmails}
                    onChange={() => setMarketingEmails(!marketingEmails)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="pt-4">
                <button 
                  className="btn-primary"
                  onClick={saveNotificationSettings}
                >
                  Save Notification Settings
                </button>
              </div>
            </div>
          </div>
          
          {/* Security section */}
          <div id="security" className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <HiLockClosed className="h-5 w-5 mr-2 text-gray-500" />
              Security & Password
            </h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="form-label">
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  className="form-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="new-password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              {passwordError && (
                <div className="text-error-600 text-sm">{passwordError}</div>
              )}
              
              {passwordSuccess && (
                <div className="text-success-600 text-sm">{passwordSuccess}</div>
              )}
              
              <div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-500 mb-3">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <button className="btn-outline text-sm">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
          
          {/* Payment methods section */}
          <div id="payment" className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <HiCreditCard className="h-5 w-5 mr-2 text-gray-500" />
              Payment Methods
            </h2>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">No payment methods added</p>
                    <p className="text-xs text-gray-500">Add a payment method to get paid for your work</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="btn-primary">
              Add Payment Method
            </button>
          </div>
          
          {/* Danger zone section */}
          <div id="danger" className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-error-600 mb-4 flex items-center">
              <HiOutlineExclamationCircle className="h-5 w-5 mr-2 text-error-500" />
              Danger Zone
            </h2>
            
            {!showDeleteConfirm ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Permanently delete your account and all of your content. This action cannot be undone.
                </p>
                <button
                  className="btn text-error-600 bg-error-50 hover:bg-error-100 focus:ring-error-500"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete Account
                </button>
              </div>
            ) : (
              <div className="bg-error-50 p-4 rounded-lg border border-error-300">
                <h3 className="text-sm font-medium text-error-800 mb-2">Confirm Account Deletion</h3>
                <p className="text-xs text-error-600 mb-4">
                  This action cannot be undone. All of your data will be permanently deleted.
                </p>
                <div className="flex space-x-3">
                  <button
                    className="btn-outline text-sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 text-sm"
                    onClick={handleDeleteAccount}
                  >
                    Permanently Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings