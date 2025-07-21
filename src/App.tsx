import type React from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "./contexts/auth-context"

// Import all page components
import DashboardPage from "./pages/dashboard"
import HostelSelectionPage from "./pages/hostel-selection"
import PayAccommodationPage from "./pages/pay-accommodation"
import VerifyPaymentPage from "./pages/verify-payment"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
import FAQPage from "./pages/faq"

// Import loading component
import LoadingSpinner from "./components/ui/loading-spinner"

/**
 * Protected Route Component
 * Wraps routes that require authentication
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

/**
 * Public Route Component
 * Wraps routes that should redirect authenticated users
 */
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

/**
 * Main App Component
 * Sets up routing and handles global app logic
 */
export default function App() {
  const { isLoading } = useAuth()
  const location = useLocation()

  // Log route changes for debugging (remove in production)
  useEffect(() => {
    console.log("Route changed to:", location.pathname)
  }, [location])

  // Show loading spinner while authentication is being checked
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Root route - redirects based on authentication status */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public routes - accessible only when not authenticated */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hostel-selection"
          element={
            <ProtectedRoute>
              <HostelSelectionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pay-accommodation"
          element={
            <ProtectedRoute>
              <PayAccommodationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/verify-payment"
          element={
            <ProtectedRoute>
              <VerifyPaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <FAQPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for 404 pages */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
                <p className="text-gray-600">The page you're looking for doesn't exist.</p>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  )
}
