import { useState } from 'react'
import { HiPencil, HiOutlineDocumentAdd, HiCheck } from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../hooks/useNotifications'
import { motion } from 'framer-motion'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { addNotification } = useNotifications()
  
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Form state
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '')
  const [newAvatar, setNewAvatar] = useState(null)
  
  // Preview avatar
  const avatarPreview = newAvatar 
    ? URL.createObjectURL(newAvatar) 
    : user?.avatar || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  
  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewAvatar(e.target.files[0])
    }
  }
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Parse skills string to array
      const skillsArray = skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
      
      // In a real app, we would upload the avatar to a storage service
      // For demo, we'll just pretend to update the URL
      await updateProfile({
        name,
        bio,
        skills: skillsArray,
        avatar: avatarPreview
      })
      
      setEditing(false)
      addNotification({
        type: 'success',
        content: 'Profile updated successfully!'
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      addNotification({
        type: 'error',
        content: 'Failed to update profile. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your personal information and preferences
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        {/* Banner and avatar */}
        <div className="relative h-32 bg-gradient-to-r from-primary-600 to-accent-600">
          <div className="absolute -bottom-12 left-6 sm:left-8">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src={avatarPreview}
                alt={user?.name || 'User'}
                className="h-full w-full object-cover"
              />
              
              {editing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <label className="cursor-pointer p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors">
                    <HiPencil className="h-5 w-5 text-gray-700" />
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          
          {!editing && (
            <button
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
              onClick={() => setEditing(true)}
            >
              <HiPencil className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Profile content */}
        <div className="pt-16 pb-8 px-4 sm:px-8">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input bg-gray-50"
                    value={user?.email || ''}
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email address cannot be changed
                  </p>
                </div>
                
                <div>
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="form-input"
                    placeholder="Tell clients/workers about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                
                {user?.userType === 'worker' && (
                  <div>
                    <label htmlFor="skills" className="form-label">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      className="form-input"
                      placeholder="e.g., Proofreading, Editing, Research"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setEditing(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {user?.name || 'User'}
              </h2>
              <p className="text-sm text-gray-500">
                {user?.email || 'user@example.com'}
              </p>
              
              <div className="mt-1 flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {user?.userType === 'client' ? 'Client' : 'Worker'}
                </span>
                
                <div className="ml-3 flex items-center text-yellow-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="ml-1 text-xs text-gray-700">
                    {user?.rating || 0} ({user?.completedTasks || 0} tasks)
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-base font-medium text-gray-900">Bio</h3>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
                  {bio || 'No bio provided yet.'}
                </p>
              </div>
              
              {user?.userType === 'worker' && (
                <div className="mt-6">
                  <h3 className="text-base font-medium text-gray-900">Skills</h3>
                  {user?.skills?.length > 0 || skills ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(user?.skills || skills.split(',').map(s => s.trim())).map((skill, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-gray-500">
                      No skills listed yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Task activity and statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white rounded-xl shadow-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Statistics</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Completed Tasks</span>
                <span className="font-medium text-gray-900">{user?.completedTasks || 0}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${Math.min(100, ((user?.completedTasks || 0) / 20) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Satisfaction Rating</span>
                <span className="font-medium text-gray-900">{user?.rating || 0}/5</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${((user?.rating || 0) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">On-time Delivery</span>
                <span className="font-medium text-gray-900">100%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
          
          <div className="space-y-4">
            {user?.userType === 'client' ? (
              <a 
                href="/create-task"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="p-2 bg-primary-100 text-primary-700 rounded-lg">
                  <HiOutlineDocumentAdd className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Create a New Task</h3>
                  <p className="text-xs text-gray-500">Post a task for document services</p>
                </div>
              </a>
            ) : (
              <a 
                href="/browse-tasks"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="p-2 bg-primary-100 text-primary-700 rounded-lg">
                  <HiOutlineDocumentAdd className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Find Tasks</h3>
                  <p className="text-xs text-gray-500">Browse available document tasks</p>
                </div>
              </a>
            )}
            
            <a 
              href="/messages"
              className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="p-2 bg-primary-100 text-primary-700 rounded-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Manage Messages</h3>
                <p className="text-xs text-gray-500">View and respond to conversations</p>
              </div>
            </a>
            
            <a 
              href="/settings"
              className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="p-2 bg-primary-100 text-primary-700 rounded-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Account Settings</h3>
                <p className="text-xs text-gray-500">Manage your account preferences</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile