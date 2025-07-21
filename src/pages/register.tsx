"use client"

/**
 * Modern Register Page Component
 * Updated to use the new Registration Wizard
 */

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { RegistrationWizard } from "../components/auth/register-wizard"
import { useAuth } from "../contexts/auth-context"

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

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

  if (isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header section with logo and title */}
        <div className="text-center mb-8">
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
              <h1 className="text-2xl font-bold text-white">ABU</h1>
              <p className="text-lg text-white">Accommodation Portal</p>
            </div>
          </div>
        </div>

        {/* Registration Wizard */}
        <RegistrationWizard />
      </div>
    </div>
  )
}
