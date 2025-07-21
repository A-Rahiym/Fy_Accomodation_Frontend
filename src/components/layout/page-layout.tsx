import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { useAuth } from "../../contexts/auth-context"
import LoadingSpinner from "../ui/loading-spinner"

/**
 * Props for the PageLayout component
 */
interface PageLayoutProps {
  /** Child components to render in the main content area */
  children: React.ReactNode
}

/**
 * Page Layout Component
 * Wraps page content with consistent header and footer
 * Handles authentication checks and loading states
 */
export function PageLayout({ children }: PageLayoutProps) {
  // Get authentication state and user data
  const { user, isLoading } = useAuth()

  // Show loading spinner while authentication is being checked
  if (isLoading) {
    return <LoadingSpinner text="Loading your dashboard..." />
  }

  // Show authentication required message if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with navigation and user info */}
      <Header studentInfo={user} />

      {/* Main content area */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
