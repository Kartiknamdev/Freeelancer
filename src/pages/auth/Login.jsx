import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { motion } from 'framer-motion'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // Demo login credentials
  const handleDemoLogin = async (type) => {
    setLoading(true)
    
    try {
      if (type === 'client') {
        await login('alex@example.com', 'password123')
      } else {
        await login('sarah@example.com', 'password123')
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-6">Sign in to your account</h2>
      
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
            autoComplete="current-password"
            required
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="form-checkbox"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="text-primary-600 hover:text-primary-800">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or use demo account</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="btn-outline text-xs"
            onClick={() => handleDemoLogin('client')}
          >
            Sign in as Client
          </button>
          <button
            type="button"
            className="btn-outline text-xs"
            onClick={() => handleDemoLogin('worker')}
          >
            Sign in as Worker
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-800 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login