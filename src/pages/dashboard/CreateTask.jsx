import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineDocument, HiOutlineCurrencyDollar, HiOutlineCalendar, HiOutlineTag } from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'
import { useTasks } from '../../hooks/useTasks'
import { useNotifications } from '../../hooks/useNotifications'
import { motion } from 'framer-motion'

const categories = [
  'Proofreading',
  'Editing',
  'Formatting',
  'Transcription',
  'Resume',
  'Legal',
  'Academic',
  'Business',
  'Other'
]

const CreateTask = () => {
  const { user } = useAuth()
  const { createTask } = useTasks()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [budget, setBudget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [files, setFiles] = useState([])
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const formErrors = {}
    if (!title.trim()) formErrors.title = 'Title is required'
    if (!description.trim()) formErrors.description = 'Description is required'
    if (!budget || isNaN(budget)) formErrors.budget = 'Valid budget is required'
    if (!deadline) formErrors.deadline = 'Deadline is required'
    if (!category) formErrors.category = 'Category is required'
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    
    setLoading(true)
    
    // Format tags as array
    const tagsList = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
    
    // Create file attachments array
    const attachments = files.map(file => ({
      name: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      uploadedAt: new Date().toISOString()
    }))
    
    try {
      const task = await createTask({
        title,
        description,
        requirements,
        budget: parseFloat(budget),
        deadline: new Date(deadline).toISOString(),
        category,
        tags: tagsList,
        createdBy: user.id,
        attachments
      })
      
      // Add notification
      addNotification({
        type: 'success',
        content: 'Your task was created successfully!',
        actionLabel: 'View Task',
        onAction: () => navigate(`/tasks/${task.id}`)
      })
      
      navigate('/history')
    } catch (error) {
      console.error('Error creating task:', error)
      setErrors({ submit: 'Failed to create task. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }
  
  // Remove a file from the list
  const removeFile = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  // Calculate minimum deadline date (tomorrow)
  const getTomorrow = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
        <p className="text-sm text-gray-600 mt-1">
          Post a new document task for freelancers to work on
        </p>
      </div>
      
      <motion.form 
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-card p-6"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {errors.submit && (
          <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md">
            {errors.submit}
          </div>
        )}
        
        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="title" className="form-label">
            Task Title <span className="text-error-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineDocument className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="title"
              className={`form-input pl-10 ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
              placeholder="e.g., Proofread Marketing Document"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {errors.title && <p className="mt-1 text-xs text-error-600">{errors.title}</p>}
        </motion.div>
        
        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="description" className="form-label">
            Task Description <span className="text-error-600">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className={`form-input ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="Provide a detailed description of what needs to be done"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <p className="mt-1 text-xs text-error-600">{errors.description}</p>}
        </motion.div>
        
        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="requirements" className="form-label">
            Requirements
          </label>
          <textarea
            id="requirements"
            rows={3}
            className="form-input"
            placeholder="List any specific requirements, skills, or qualifications needed"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={itemVariants}>
            <label htmlFor="budget" className="form-label">
              Budget (USD) <span className="text-error-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="budget"
                className={`form-input pl-10 ${errors.budget ? 'border-error-500 focus:ring-error-500' : ''}`}
                placeholder="e.g., 150"
                min="1"
                step="0.01"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
            {errors.budget && <p className="mt-1 text-xs text-error-600">{errors.budget}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="deadline" className="form-label">
              Deadline <span className="text-error-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="deadline"
                className={`form-input pl-10 ${errors.deadline ? 'border-error-500 focus:ring-error-500' : ''}`}
                min={getTomorrow()}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            {errors.deadline && <p className="mt-1 text-xs text-error-600">{errors.deadline}</p>}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={itemVariants}>
            <label htmlFor="category" className="form-label">
              Category <span className="text-error-600">*</span>
            </label>
            <select
              id="category"
              className={`form-select ${errors.category ? 'border-error-500 focus:ring-error-500' : ''}`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-error-600">{errors.category}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label htmlFor="tags" className="form-label">
              Tags (comma separated)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineTag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="tags"
                className="form-input pl-10"
                placeholder="e.g., proofreading, marketing, urgent"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div className="mb-8" variants={itemVariants}>
          <label className="form-label">
            Attachments
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, TXT, etc. up to 10MB each
              </p>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
              <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                {files.map((file, index) => (
                  <li key={index} className="px-4 py-3 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="font-medium text-error-600 hover:text-error-500"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
        
        <motion.div className="flex justify-end space-x-3" variants={itemVariants}>
          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate('/history')}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </motion.div>
      </motion.form>
    </div>
  )
}

export default CreateTask