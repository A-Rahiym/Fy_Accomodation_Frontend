import axiosInstance from "./axiosInstance"

/**
 * Register a new student account
 * @param {Object} studentData - Student registration data
 * @param {string} studentData.name - Student's full name
 * @param {string} studentData.studentId - Student ID
 * @param {string} studentData.password - Password
 * @param {string} studentData.department - Academic department
 * @param {string} studentData.faculty - Academic faculty
 * @param {string} studentData.level - Academic level
 * @param {string} studentData.gender - Student's gender
 * @returns {Promise<Object>} Registration response data
 */
export const registerStudent = async (studentData ) => {
  try {
    console.log("Registering student:", studentData.name)
    const res = await axiosInstance.post("/student/register", studentData)
    return res.data
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Login student with credentials
 * @param {Object} loginData - Login credentials
 * @param {string} loginData.studentId - Student ID
 * @param {string} loginData.password - Password
 * @returns {Promise<Object>} Login response with token and user data
 */
export const loginStudent = async (loginData) => {
  try {
    console.log("Logging in student:", loginData.studentId)
    const res = await axiosInstance.post("/student/login", loginData)

    // Store authentication token if provided
    if (res.data.token) {
      localStorage.setItem("studentToken", res.data.token)
    }

    return res.data
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Get student profile information
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} Student profile data
 */
export const getStudentProfile = async (studentId) => {
  try {
    const token = localStorage.getItem("studentToken")
    if (!token) {
      throw new Error("Authentication token not found. Please log in.")
    }

    console.log("Fetching profile for student:", studentId)
    const res = await axiosInstance.get(`/student/profile?id=${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (error) {
    console.error("Profile fetch error:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Update student payment status
 * @param {string} studentId - Student ID
 * @param {boolean} paidStatus - Payment status (true/false)
 * @returns {Promise<Object>} Update response
 */
export const updatePaymentStatus = async (studentId, paidStatus) => {
  try {
    const token = localStorage.getItem("studentToken")
    if (!token) {
      throw new Error("Authentication token not found. Please log in.")
    }

    if (typeof paidStatus !== "boolean") {
      throw new Error("paidStatus must be a boolean value.")
    }

    console.log(`Updating payment status for student ${studentId}: ${paidStatus}`)
    const res = await axiosInstance.put(
      `/student/payment-status/${studentId}`,
      { paidStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return res.data
  } catch (error) {
    console.error("Payment status update error:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Submit student's hostel choices
 * @param {string} studentId - Student ID (UUID)
 * @param {Object} choices - Hostel choices object
 * @param {string} choices.choice1Id - First choice hostel ID
 * @param {string} choices.choice2Id - Second choice hostel ID (optional)
 * @param {string} choices.choice3Id - Third choice hostel ID (optional)
 * @returns {Promise<Object>} Submission response
 */
export const submitHostelChoices = async (studentId, choices) => {
  try {
    console.log(`Submitting hostel choices for student ${studentId}:`, choices)

    const res = await axiosInstance.post(`/student/${studentId}/submit-choices`, choices, {
      headers: {
        "Content-Type": "application/json",
        // Note: Uncomment the line below if authentication is required
        // 'Authorization': `Bearer ${localStorage.getItem('studentToken')}`,
      },
    })

    return res.data
  } catch (error) {
    console.error("Hostel choices submission error:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Select accommodation (legacy function - may need updating)
 * @param {Object} formData - Accommodation selection data
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Selection response
 */
export const selectAccommodation = async (formData, token) => {
  try {
    console.log("Selecting accommodation:", formData)
    const res = await axiosInstance.post("/students/select-accommodation", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (error) {
    console.error("Accommodation selection error:", error.response?.data || error.message)
    throw error
  }
}


/**
 * Check if a student is eligible to submit hostel choices
 * @param {string} studentId - Student ID (UUID)
 * @returns {Promise<Object>} Eligibility status
 */
export const checkStudentEligibility = async (studentId) => {
  try {
    console.log("Checking eligibility for student:", studentId);

    const token = localStorage.getItem("studentToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }

    const res = await axiosInstance.get(`/student/${studentId}/eligibility`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Eligibility check error:", error.response?.data || error.message);
    throw error;
  }
};


export const getStudentStatus = async (studentId) => {
  try {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }

    console.log("Fetching status for student:", studentId);
    const res = await axiosInstance.get(`/student/${studentId}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Status fetch error:", error.response?.data || error.message);
    throw error;
  }
};

export const checkStudentRoomInfo = async (studentId) => {
  try {
    console.log("Getting student room info:", studentId);

    const token = localStorage.getItem("studentToken");
    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }

    const res = await axiosInstance.get(`/student/${studentId}/room-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Eligibility check error:", error.response?.data || error.message);
    throw error;
  }
};
