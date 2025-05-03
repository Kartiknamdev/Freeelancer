import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { motion } from 'framer-motion'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userType, setUserType] = useState('client')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Form validation
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    
    setError('')
    setLoading(true)
    
    try {
      await register(name, email, password, userType)
      navigate('/')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-6">Create your account</h2>
      
      {error && (
        <motion.div 
          className="bg-error-50 text-error-700 p-3 rounded-md mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        
        <div>
          <label className="form-label">Account type</label>
          <div className="mt-1 grid grid-cols-2 gap-3">
            <div
              className={`
                border rounded-md px-3 py-2 flex items-center justify-center cursor-pointer
                text-sm font-medium transition-colors
                ${userType === 'client' 
                  ? 'bg-primary-50 border-primary-300 text-primary-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
              onClick={() => setUserType('client')}
            >
              I need tasks done
            </div>
            <div
              className={`
                border rounded-md px-3 py-2 flex items-center justify-center cursor-pointer
                text-sm font-medium transition-colors
                ${userType === 'worker' 
                  ? 'bg-primary-50 border-primary-300 text-primary-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
              onClick={() => setUserType('worker')}
            >
              I want to work
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="form-checkbox"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{' '}
            <Link to="#" className="text-primary-600 hover:text-primary-800">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="#" className="text-primary-600 hover:text-primary-800">
              Privacy Policy
            </Link>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register