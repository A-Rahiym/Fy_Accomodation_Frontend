import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { StudentInfo, LoginCredentials, RegisterData } from "../types"
import { loginStudent, registerStudent, getStudentProfile } from "../api"

/**
 * Authentication context type definition
 */
interface AuthContextType {
  /** Current authenticated user data */
  user: StudentInfo | null
  /** Login method - returns success status and message */
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>
  /** Registration method - returns success status and message */
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>
  /** Logout method - clears user session */
  logout: () => void
  /** Update user data method */
  updateUser: (userData: Partial<StudentInfo>) => void
  /** Boolean indicating if user is authenticated */
  isAuthenticated: boolean
  /** Boolean indicating if authentication check is in progress */
  isLoading: boolean
  /** Refresh user profile from server */
  refreshProfile: () => Promise<void>
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Props for the AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode
}

/**
 * Enhanced Authentication Provider Component
 * Uses real API calls for authentication and profile management
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // State for storing current user data
  const [user, setUser] = useState<StudentInfo | null>(null)

  // State for tracking loading status during auth operations
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Effect to check for existing user session on app startup
   * Attempts to restore user session and refresh profile data
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem("abu_user")
      const token = localStorage.getItem("studentToken")

      if (savedUser && token) {
        try {
          // Parse saved user data
          const userData = JSON.parse(savedUser)
          setUser(userData)

          // Attempt to refresh profile from server to ensure data is current
          try {
            const profileData = await getStudentProfile(userData.studentId)
            if (profileData.success && profileData.student) {
              const updatedUser = {
                ...userData,
                ...profileData.student,
              }
              setUser(updatedUser)
              localStorage.setItem("abu_user", JSON.stringify(updatedUser))
            }
          } catch (profileError) {
            console.warn("Could not refresh profile, using cached data:", profileError)
            // Continue with cached data if profile refresh fails
          }

          console.log("Restored user session:", userData.name)
        } catch (error) {
          // Clear corrupted data if parsing fails
          console.error("Failed to parse saved user data:", error)
          localStorage.removeItem("abu_user")
          localStorage.removeItem("studentToken")
        }
      }

      // Mark loading as complete
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  /**
   * Login function using real API
   * @param credentials - User login credentials
   * @returns Promise with success status and message
   */
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)

    try {
      // Call the real login API
      const response = await loginStudent(credentials)

      if (response.success && response.student) {
        // Create user data object from API response
        const userData: StudentInfo = {
          name: response.student.name || response.student.fullName,
          studentId: response.student.studentId || response.student.student_id,
          id:response.student.id,
          department: response.student.department,
          campus: response.student.campus,
          gender: response.student.gender,
          level: response.student.level,
          faculty: response.student.faculty,
        }
        console.log(userData);

        // Update state and persist to localStorage
        setUser(userData)
        localStorage.setItem("abu_user", JSON.stringify(userData))

        // Token should already be stored by the API function
        console.log("User logged in successfully:", userData.name)

        setIsLoading(false)
        return { success: true, message: response.message || "Login successful" }
      } else {
        setIsLoading(false)
        return { success: false, message: response.message || "Login failed" }
      }
    } catch (error: any) {
      setIsLoading(false)
      console.error("Login error:", error)

      // Extract error message from API response
      const errorMessage = error.response?.data?.message || error.message || "Login failed"
      return { success: false, message: errorMessage }
    }
  }

  /**
   * Registration function using real API
   * @param data - User registration data
   * @returns Promise with success status and message
   */
  const register = async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)

    try {
      // Client-side validation
      if (data.password !== data.confirmPassword) {
        setIsLoading(false)
        return { success: false, message: "Passwords do not match" }
      }

      if (data.password.length < 6) {
        setIsLoading(false)
        return { success: false, message: "Password must be at least 6 characters long" }
      }

      // Prepare data for API call (remove confirmPassword)
      const { confirmPassword, ...Data } = data
      console.log("Form submitted:", data)
      // Call the real registration API
      const response = await registerStudent(Data)
      
      if (response.success && response.student) {
        // Create user data object from API response
        const userData: StudentInfo = {
          name: response.student.name || response.student.fullName,
          studentId: response.student.studentId || response.student.student_id,
          department: response.student.department,
          id: response.student.id,
          campus: response.student.campus,
          gender: response.student.gender,
          level: response.student.level,
          faculty: response.student.faculty,
        }

        // Update state and persist to localStorage
        setUser(userData)
        localStorage.setItem("abu_user", JSON.stringify(userData))

        // Store token if provided
        if (response.token) {
          localStorage.setItem("studentToken", response.token)
        }

        console.log("User registered successfully:", userData.name)

        setIsLoading(false)
        return { success: true, message: response.message || "Registration successful" }
      } else {
        setIsLoading(false)
        return { success: false, message: response.message || "Registration failed" }
      }
    } catch (error: any) {
      setIsLoading(false)
      console.error("Registration error:", error)

      // Extract error message from API response
      const errorMessage = error.response?.data?.message || error.message || "Registration failed"
      return { success: false, message: errorMessage }
    }
  }

  /**
   * Refresh user profile from server
   */
  const refreshProfile = async (): Promise<void> => {
    if (!user) return

    try {
      const profileData = await getStudentProfile(user.studentId)
      if (profileData.success && profileData.student) {
        const updatedUser = {
          ...user,
          ...profileData.student,
        }
        setUser(updatedUser)
        localStorage.setItem("abu_user", JSON.stringify(updatedUser))
        console.log("Profile refreshed successfully")
      }
    } catch (error) {
      console.error("Profile refresh error:", error)
      // Don't throw error, just log it
    }
  }

  /**
   * Logout function
   * Clears user session and removes data from localStorage
   */
  const logout = () => {
    console.log("User logged out:", user?.name)
    setUser(null)
    localStorage.removeItem("abu_user")
    localStorage.removeItem("studentToken")
    localStorage.removeItem("token") // Remove legacy token as well
  }

  /**
   * Update user function
   * Updates specific user data fields and syncs with server
   * @param userData - Partial user data to update
   */
  const updateUser = async (userData: Partial<StudentInfo>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("abu_user", JSON.stringify(updatedUser))
      console.log("User data updated:", updatedUser.name)

      // Optionally sync with server here
      // await updateStudentProfile(updatedUser)
    }
  }

  // Computed property for authentication status
  const isAuthenticated = user !== null

  // Context value object containing all auth methods and state
  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated,
    isLoading,
    refreshProfile,
  }

  // Provide the context value to all child components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to use authentication context
 * @returns AuthContextType object with all auth methods and state
 */
export function useAuth() {
  const context = useContext(AuthContext)

  // Ensure hook is used within AuthProvider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
