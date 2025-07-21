/**
 * TypeScript Type Definitions
 * Contains all interface and type definitions used throughout the application
 */

/**
 * Student Information Interface
 * Represents a student's personal and academic data
 */
export interface StudentInfo {
  /** Student's full name */
  name: string
  /** Unique student identification number */
  studentId: string
  /** Academic department */
  department: string
  /** */ 
  id: string,

  avatar?: string
  /** Student's gender */
  gender: "Male" | "Female"
  /** Current academic level (100, 200, 300, 400, 500) */
  level: string
  /** Academic faculty */
  faculty: string
  /** Campus location */
  campus: string
}

/**
 * Application Status Interface
 * Tracks the status of a student's accommodation application
 */
export interface ApplicationStatus {
  /** Whether student has submitted accommodation application */
  hasApplied: boolean
  /** Whether student has submitted payment evidence */
  hasSubmittedPayment: boolean
  /** Whether student has been allocated a room */
  roomAllocated: boolean
  /** Date when application was submitted */
  applicationDate?: string
  /** Date when payment was submitted */
  paymentDate?: string
}

/**
 * Progress Step Interface
 * Represents a step in the application progress indicator
 */
export interface ProgressStep {
  /** Whether this step has been completed */
  completed: boolean
  /** Display label for the step */
  label: string
}

/**
 * Announcement Interface
 * Represents a system announcement or notice
 */
export interface Announcement {
  /** Unique identifier for the announcement */
  id: string
  /** Announcement title */
  title: string
  /** Announcement content/message */
  content: string
  /** Date when announcement was published */
  date: string
  /** Priority level for display ordering */
  priority: "high" | "medium" | "low"
}

/**
 * Navigation Item Interface
 * Represents a navigation menu item
 */
export interface NavItem {
  /** Display text for the navigation item */
  label: string
  /** URL path for the navigation item */
  href: string
  /** Whether this item is currently active */
  active?: boolean
}

/**
 * Hostel Interface
 * Represents a hostel/accommodation facility
 */
export interface Hostel {
  /** Unique identifier for the hostel */
  id: string
  /** Hostel name */
  name: string
  /** Gender restriction for the hostel */
  gender: "Male" | "Female"
  /** Campus location */
  campus: string
}

/**
 * Hostel Choice Interface
 * Represents a student's hostel preference choice
 */
export interface HostelChoice {
  /** Choice priority (first, second, third) */
  choice: "first" | "second" | "third"
  /** Selected hostel for this choice (null if not selected) */
  hostel: Hostel | null
}


/**
 * Login Credentials Interface
 * Data required for user authentication
 */
export interface LoginCredentials {
  /** Student ID for login */
  studentId: string
  /** Password for login */
  password: string
}

/**
 * Registration Data Interface - Simplified based on form images
 * Data required for new user registration
 */
export interface RegisterData {
  // Step 1: Account Information
  /** Student's full name */
  name: string
  /** Student ID */
  studentId: string
  /** Password */
  password: string
  /** Password confirmation */
  confirmPassword: string
  // Step 2: Academic Information
  /** Academic faculty */
  faculty: string
  /** Academic department */
  department: string
  /** Student Leve*/
  level: string
  /** Campus location */
  campus: string
  /** Student type */
  student_type: string
  // Step 3: Personal Information
  /** Gender */
  gender: "Male" | "Female"
  /** Accessibility needs */
  accessibilityNeeds: string
}

/**
 * Wizard Step Interface
 * Represents a step in the registration wizard
 */
export interface WizardStep {
  /** Step number */
  step: number
  /** Step title */
  title: string
  /** Step description */
  description: string
  /** Whether step is completed */
  completed: boolean
  /** Whether step is current */
  current: boolean
}

/**
 * Academic Data Interface
 * Structure for academic data from JSON
 */
export interface AcademicData {
  campuses: string[],
  levels: string[],
  student_types: string[],
  faculties: Record<string, string[]>
}
