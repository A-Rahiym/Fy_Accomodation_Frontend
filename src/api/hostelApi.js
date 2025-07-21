import axiosInstance from "./axiosInstance"

/**
 * Get hostel details based on gender and campus
 * @param {string} gender - Student's gender (MALE/FEMALE)
 * @param {string} campus - Campus location (Main, etc.)
 * @returns {Promise<Object>} Hostel details data
 */
export const getHostelDetails = async (gender, campus) => {
  try {
    console.log(`Fetching hostels for gender: ${gender}, campus: ${campus}`)

    // Make GET request with query parameters
    const res = await axiosInstance.get("/hostels", {
      params: {
        gender: gender,
        campus: campus,
      },
    })

    console.log(`Found ${res.data.length || 0} hostels`)
    return res.data
  } catch (error) {
    console.error(
      `Error fetching hostel details for gender "${gender}" and campus "${campus}":`,
      error.response?.data || error.message,
    )
    // Re-throw the error so the calling component can handle it
    throw error
  }
}

/**
 * Check booking status for a student
 * @param {string} studentId - Student ID
 * @param {string} token - Authentication token (optional, will use stored token if not provided)
 * @returns {Promise<Object>} Booking status data
 */
export const checkBooking = async (studentId, token = null) => {
  try {
    // Use provided token or get from localStorage
    const authToken = token || localStorage.getItem("studentToken")

    if (!authToken) {
      throw new Error("Authentication token not found. Please log in.")
    }

    console.log(`Checking booking status for student: ${studentId}`)

    const res = await axiosInstance.get(`/hostels/booking-status/${studentId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    return res.data
  } catch (error) {
    console.error("Booking status check error:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Book accommodation for a student
 * @param {string} roomId - Room ID to book
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} Booking response data
 */
export const bookAccommodation = async (roomId, studentId) => {
  try {
    const token = localStorage.getItem("studentToken")

    if (!token) {
      throw new Error("Authentication token not found. Please log in.")
    }

    console.log(`Attempting to book accommodation - Room: ${roomId}, Student: ${studentId}`)

    const res = await axiosInstance.post(
      "/hostels/book",
      {
        room_id: roomId,
        student_id: studentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    console.log("Accommodation booked successfully")
    return res.data
  } catch (error) {
    console.error("Accommodation booking error:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Get available rooms for a specific hostel
 * @param {string} hostelId - Hostel ID
 * @returns {Promise<Object>} Available rooms data
 */
export const getAvailableRooms = async (hostelId) => {
  try {
    console.log(`Fetching available rooms for hostel: ${hostelId}`)

    const res = await axiosInstance.get(`/hostels/${hostelId}/rooms`)
    return res.data
  } catch (error) {
    console.error("Available rooms fetch error:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Get hostel statistics (capacity, occupancy, etc.)
 * @param {string} hostelId - Hostel ID
 * @returns {Promise<Object>} Hostel statistics
 */
export const getHostelStats = async (hostelId) => {
  try {
    console.log(`Fetching statistics for hostel: ${hostelId}`)

    const res = await axiosInstance.get(`/hostels/${hostelId}/stats`)
    return res.data
  } catch (error) {
    console.error("Hostel stats fetch error:", error.response?.data || error.message)
    throw error
  }
}
