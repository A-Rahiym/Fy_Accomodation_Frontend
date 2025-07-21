export {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updatePaymentStatus,
  submitHostelChoices,
  selectAccommodation,
} from "./studentApi.js"

// Export all hostel-related API functions
export {
  getHostelDetails,
  checkBooking,
  bookAccommodation,
  getAvailableRooms,
  getHostelStats,
} from "./hostelApi"

// Export axios instance for custom API calls
export { default as axiosInstance } from "./axiosInstance"
