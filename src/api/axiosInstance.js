import axios from "axios"
/**
 * Create axios instance with base configuration
 * All API calls will use this configured instance
 */
const axiosInstance = axios.create({
  // Base URL for all API requests - adjust based on your backend server
  baseURL:"http://localhost:5000/api",

  // Default headers for all requests
  headers: {
    "Content-Type": "application/json",
  },

  // Request timeout in milliseconds (10 seconds)
  timeout: 10000,
})

/**
 * Request Interceptor
 * Automatically adds authentication token to requests if available
 * Runs before every request is sent
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Get authentication token from localStorage
    const token = localStorage.getItem("studentToken") || localStorage.getItem("token")

    // Add token to Authorization header if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request details for debugging (remove in production)
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`)

    return config
  },
  (error) => {
    // Handle request errors
    console.error("Request interceptor error:", error)
    return Promise.reject(error)
  },
)

/**
 * Response Interceptor
 * Handles common response scenarios like token expiration
 * Runs after every response is received
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging (remove in production)
    console.log(`Response from ${response.config.url}:`, response.status)
    return response
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem("studentToken")
      localStorage.removeItem("token")
      localStorage.removeItem("abu_user")

      // Redirect to login page
      window.location.href = "/login"
    }

    // Log error details for debugging
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    })

    return Promise.reject(error)
  },
)

export default axiosInstance
