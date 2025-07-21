"use client"

import type React from "react"

/**
 * Login Page Component
 * Handles user authentication with student ID and password
 * Redirects authenticated users to dashboard
 */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "../contexts/auth-context"
import type { LoginCredentials } from "../types"

/**
 * Login Page Component
 * Renders login form and handles authentication
 */
export default function LoginPage() {
  // Authentication context and navigation
  const { isAuthenticated, isLoading, login } = useAuth()
  const navigate = useNavigate()

  // Form state management
  const [credentials, setCredentials] = useState<LoginCredentials>({
    studentId: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Redirect authenticated users to dashboard
   */
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  /**
   * Handle form submission
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      // Attempt to login with provided credentials
      const result = await login(credentials)

      if (result.success) {
        // Redirect to dashboard on successful login
        navigate("/dashboard")
      } else {
        // Show error message on failed login
        setError(result.message)
      }
    } catch (err) {
      // Handle unexpected errors
      setError("An error occurred. Please try again.")
      console.error("Login error:", err)
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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="mt-2 text-white">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if user is already authenticated (will redirect)
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header section with logo and title */}
        <div className="text-center mb-12">
          {/* ABU Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
              {/* ABU Emblem - simplified version */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-900"
              >
                <path d="M20 2L35 12V28L20 38L5 28V12L20 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M20 14V26M14 20H26" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">ABU ZARIA</h1>
              <p className="text-lg text-white">Student Accommodation Portal</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-8">
          {/* Login Title */}
          <h2 className="text-4xl font-bold text-white text-center mb-8">Log in</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message display */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-200 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Registration Number input */}
            <div className="space-y-2">
              <label htmlFor="studentId" className="block text-white text-lg font-medium">
                Registration Number
              </label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="UG20/1234"
                value={credentials.studentId}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-4 bg-gray-200 text-gray-800 rounded-xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all disabled:opacity-50"
              />
            </div>

            {/* Password input with visibility toggle */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-white text-lg font-medium">
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
                  className="w-full px-4 py-4 pr-12 bg-gray-200 text-gray-800 rounded-xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all disabled:opacity-50"
                />

                {/* Password visibility toggle button */}
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-white hover:text-blue-300 transition-colors text-sm"
                onClick={() => {
                  // TODO: Implement forgot password functionality
                  alert("Forgot password functionality - integrate with your API")
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Log in"
              )}
            </button>

            {/* Registration link */}
            <div className="text-center text-white">
              <span>Don't have an account? </span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                disabled={isSubmitting}
              >
                Sign up
              </button>
            </div>
          </form>

          {/* Demo credentials info */}
          <div className="mt-8 p-4 bg-blue-900/30 rounded-lg border border-blue-700/30">
            <p className="text-xs text-blue-200 font-medium mb-2 text-center">Demo Credentials:</p>
            <div className="text-xs text-blue-300 text-center space-y-1">
              <p>Registration Number: U18CO1002</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
