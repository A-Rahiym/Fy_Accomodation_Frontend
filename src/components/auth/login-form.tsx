"use client"

import type React from "react"

/**
 * Login Form Component
 * Handles user authentication with student ID and password
 * Used within the login page
 */

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"
import { useNavigate } from "react-router-dom"
import type { LoginCredentials } from "../../types"

/**
 * Login Form Component
 * Renders login form and handles authentication
 */
export function LoginForm() {
  const navigate = useNavigate()

  // Form state management
  const [credentials, setCredentials] = useState<LoginCredentials>({
    studentId: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()

  /**
   * Handle form submission
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const result = await login(credentials)
      if (result.success) {
        navigate("/dashboard")
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handle input field changes
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-1">Sign in to your accommodation portal account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error message display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Student ID input */}
        <div className="space-y-2">
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
          <input
            id="studentId"
            name="studentId"
            type="text"
            placeholder="Enter your student ID (e.g., U18CO1002)"
            value={credentials.studentId}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Password input with visibility toggle */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />

            {/* Password visibility toggle button */}
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Registration link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
            disabled={isSubmitting}
          >
            Register here
          </button>
        </div>
      </form>

      {/* Demo credentials info */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</p>
        <p className="text-xs text-blue-700">Student ID: U18CO1002</p>
        <p className="text-xs text-blue-700">Password: password123</p>
      </div>
    </div>
  )
}
