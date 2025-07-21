import { Bell, User, LogOut } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import type { StudentInfo, NavItem } from "../../types"
import { useAuth } from "../../contexts/auth-context"

/**
 * Props for the Header component
 */
interface HeaderProps {
  /** Student information to display in header */
  studentInfo: StudentInfo
}

/**
 * Header Component
 * Renders the main navigation header with user info and menu
 */
export function Header({ studentInfo }: HeaderProps) {
  // React Router hooks for navigation and current location
  const navigate = useNavigate()
  const location = useLocation()

  // Authentication context for logout functionality
  const { logout } = useAuth()

  /**
   * Navigation items configuration
   * Defines all main navigation links in the header
   */
  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Hostel Selection", href: "/hostel-selection" },
    { label: "Pay Accommodation", href: "/pay-accommodation" },
    { label: "Verify Payment", href: "/verify-payment" },
    { label: "FAQ", href: "/faq" },
  ]

  /**
   * Handle user logout
   * Clears authentication and redirects to login page
   */
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  /**
   * Handle navigation to different routes
   * @param href - The route path to navigate to
   */
  const handleNavigation = (href: string) => {
    navigate(href)
  }

  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and main navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo/Brand - clickable to go to dashboard */}
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="text-lg font-semibold hover:text-blue-300 transition-colors"
            >
              ABU Accommodation Portal
            </button>

            {/* Main navigation menu - hidden on mobile */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? "bg-blue-500 text-white" // Active state styling
                      : "hover:text-blue-300 hover:bg-slate-700" // Hover state styling
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right side: Notifications and user profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications button */}
            <button className="p-2 text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </button>

            {/* User profile dropdown */}
            <div className="relative group">
              {/* Profile button */}
              <button className="flex items-center space-x-2 p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <span className="text-sm font-medium">{studentInfo.name}</span>

                {/* User avatar */}
                <div className="h-8 w-8 bg-slate-600 rounded-full flex items-center justify-center">
                  {studentInfo.avatar ? (
                    <img
                      src={studentInfo.avatar || "/placeholder.svg"}
                      alt={`${studentInfo.name}'s avatar`}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
              </button>

              {/* Dropdown menu - shown on hover */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {/* User info section */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{studentInfo.name}</p>
                  <p className="text-xs text-gray-500">{studentInfo.studentId}</p>
                </div>

                {/* Menu items */}
                <div className="py-2">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </button>

                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </button>

                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
