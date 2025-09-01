import type { StudentInfo, ApplicationStatus, Announcement, ProgressStep, Hostel } from "../types"

/**
 * Mock student information
 * Default student data for development and demo purposes
 */
export const mockStudentInfo: StudentInfo = {
  name: "Yero Muhammad",
  studentId: "U18CO1002",
  department: "Computer Engineering",
  campus: "Samaru",
  id:"",
  gender: "Male",
  level: "400",
  faculty: "Engineering",
}

/**
 * Mock application status
 * Represents the current state of a student's accommodation application
 */
export const mockApplicationStatus: ApplicationStatus = {
  hasApplied: false, // Student hasn't applied yet
  hasSubmittedPayment: false, // No payment evidence submitted
  roomAllocated: false, // No room allocated yet
  // applicationDate and paymentDate will be set when actions are completed
}

/**
 * Mock progress steps
 * Represents the steps in the accommodation application process
 */
export const mockProgressSteps: ProgressStep[] = [
  { completed: true, label: "Registration" }, // Account creation - completed
  { completed: false, label: "Application" }, // Hostel selection - pending
  { completed: false, label: "Payment" }, // Payment verification - pending
]

/**
 * Mock announcements
 * System-wide announcements and important notices
 */
const today = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Get Ready for Clearance!",
    content: `The clearance process for the current academic session will commence on ${today}. Prepare your documents and check the official university website for the full schedule.`,
    date: new Date().toISOString().split("T")[0], // e.g. "2025-09-01"
    priority: "high",
  },
];

/**
 * Mock hostels data
 * Available accommodation facilities with their details
 */
// export const mockHostels: Hostel[] = [
//   {
//     id: "1",
//     name: "Ahmadu Bello Hall",
  
//     available: 45,
//     type: "Male",
//     description: "Modern facilities with study rooms and recreational areas",
//   },
//   {
//     id: "2",
//     name: "Queen Amina Hall",
//     capacity: 180,
//     available: 23,
//     type: "Female",
//     description: "Well-maintained hostel with excellent security",
//   },
//   {
//     id: "3",
//     name: "Ribadu Hall",
//     capacity: 150,
//     available: 67,
//     type: "Male",
//     description: "Spacious rooms with good ventilation",
//   },
//   {
//     id: "4",
//     name: "Kongo Hall",
//     capacity: 120,
//     available: 12,
//     type: "Male",
//     description: "Close to academic buildings and library",
//   },
//   {
//     id: "5",
//     name: "Zaria Hall",
//     capacity: 160,
//     available: 34,
//     type: "Female",
//     description: "Newly renovated with modern amenities",
//   },
//   {
//     id: "6",
//     name: "Kaduna Hall",
//     capacity: 140,
//     available: 0, // Full capacity - no available spaces
//     type: "Male",
//     description: "Popular choice among engineering students",
//   },
// ]

/**
 * Mock FAQ data
 * Frequently asked questions and their answers
 */
export const mockFAQs = [
  {
    id: "1",
    question: "How do I apply for accommodation?",
    answer:
      "To apply for accommodation, navigate to the 'Hostel Selection' page and choose your preferred hostels in order of preference. You can select up to 3 choices to increase your chances of allocation.",
  },
  {
    id: "2",
    question: "When is the accommodation application deadline?",
    answer:
      "The accommodation application deadline is typically 4 weeks before the start of each academic session. Check the announcements section for specific dates.",
  },
  // Add more FAQs as needed
]
