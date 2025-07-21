"use client";

import type React from "react";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Check,
  User,
  GraduationCap,
  Heart,
  FileText,
} from "lucide-react";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import type { RegisterData, WizardStep, AcademicData } from "../../types";
import academicData from "../../data/academic-data.json";

/**
 * Registration Wizard Component
 * Multi-step registration form with data from JSON
 */
export function RegistrationWizard() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Load academic data from JSON
  const data: AcademicData = academicData;

  // Current step state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form data state - only fields from the images
  const [formData, setFormData] = useState<RegisterData>({
    // Step 1: Account
    name: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    // Step 2: Academics
    faculty: "",
    department: "",
    campus: "",
    level: "",
    student_type: "",
    // Step 3: Personal
    gender: "Male",
    accessibilityNeeds: "",
  });

  // Wizard steps configuration
  const steps: WizardStep[] = [
    {
      step: 1,
      title: "Account",
      description: "Basic account information",
      completed: false,
      current: currentStep === 1,
    },
    {
      step: 2,
      title: "Academics",
      description: "Academic information",
      completed: false,
      current: currentStep === 2,
    },
    {
      step: 3,
      title: "Personal",
      description: "Personal details",
      completed: false,
      current: currentStep === 3,
    },
    {
      step: 4,
      title: "Review",
      description: "Review and submit",
      completed: false,
      current: currentStep === 4,
    },
  ];

  // Update step completion status
  const updatedSteps = steps.map((step) => ({
    ...step,
    completed: step.step < currentStep,
    current: step.step === currentStep,
  }));

  /**
   * Handle input changes
   */
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset department when faculty changes
    if (name === "faculty") {
      setFormData((prev) => ({
        ...prev,
        faculty: value,
        department: "", // Reset department selection
      }));
    }
  };

  /**
   * Get available departments for selected faculty
   */
  const getAvailableDepartments = (): string[] => {
    if (!formData.faculty || !data.faculties[formData.faculty]) {
      return [];
    }
    return data.faculties[formData.faculty];
  };

  /**
   * Validate current step
   */
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.name &&
          formData.studentId &&
          formData.password &&
          formData.confirmPassword
        );
      case 2:
        return !!(formData.faculty && formData.department && formData.campus);
      case 3:
        return !!formData.gender;
      default:
        return true;
    }
  };

  /**
   * Handle next step
   */
  const handleNext = () => {
    setError("");

    // Validate current step
    if (!validateStep(currentStep)) {
      setError("Please fill in all required fields");
      return;
    }

    // Additional validation for step 1
    if (currentStep === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  /**
   * Handle previous step
   */
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      console.log("Submitting registration form:", formData);
      const result = await register(formData);
      if (result.success) {
        setCurrentStep(5); // Success step
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Render step indicator
   */
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {updatedSteps.map((step, index) => (
        <div key={step.step} className="flex items-center">
          {/* Step circle */}
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
              step.completed
                ? "bg-blue-600 border-blue-600 text-white"
                : step.current
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-gray-300 text-gray-400 bg-white"
            }`}
          >
            {step.completed ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="text-sm font-semibold">{step.step}</span>
            )}
          </div>

          {/* Step label */}
          <div className="ml-3 mr-8">
            <p
              className={`text-sm font-medium ${
                step.current
                  ? "text-blue-600"
                  : step.completed
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>

          {/* Connector line */}
          {index < updatedSteps.length - 1 && (
            <div
              className={`w-16 h-0.5 ${
                step.completed ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  /**
   * Render Step 1: Account Information
   */
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Account Information
        </h2>
        <p className="text-blue-200">Create your account credentials</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Registration Number
          </label>
          <input
            name="studentId"
            type="text"
            placeholder="e.g., U18CO1002"
            value={formData.studentId}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-12 bg-blue-100 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-12 bg-blue-100 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Render Step 2: Academic Information
   */
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Academic Information
        </h2>
        <p className="text-blue-200">Tell us about your studies</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Faculty</label>
          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            required
          >
            <option value="">Select your faculty</option>
            {Object.keys(data.faculties).map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            required
            disabled={!formData.faculty}
          >
            <option value="">
              {formData.faculty
                ? "Select your department"
                : "Please select a faculty first"}
            </option>
            {getAvailableDepartments().map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Student Type</label>
          <select
            name="student_type"
            value={formData.student_type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            required
          >
            <option value="">Select your student type</option>
            {data.student_types.map((student_type) => (
              <option key={student_type} value={student_type}>
                {student_type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            required
          >
            <option value="">Select your level</option>
            {data.levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Campus</label>
          <select
            name="campus"
            value={formData.campus}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            required
          >
            <option value="">Select your campus</option>
            {data.campuses.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  /**
   * Render Step 3: Personal Information
   */
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Personal Information
        </h2>
        <p className="text-blue-200">Help us know you better</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Do you have any accessibility needs?
          </label>
          <textarea
            name="accessibilityNeeds"
            placeholder="Please describe any accessibility requirements or special needs..."
            value={formData.accessibilityNeeds}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-blue-100 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );

  /**
   * Render Step 4: Review Information
   */
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Review Information
        </h2>
        <p className="text-blue-200">
          Please review your information before submitting
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-200 font-medium">Full Name</p>
            <p className="text-white">{formData.name}</p>
          </div>
          <div>
            <p className="text-blue-200 font-medium">Registration Number</p>
            <p className="text-white">{formData.studentId}</p>
          </div>
          <div>
            <p className="text-blue-200 font-medium">Gender</p>
            <p className="text-white">{formData.gender}</p>
          </div>
          <div>
            <p className="text-blue-200 font-medium">Faculty</p>
            <p className="text-white">{formData.faculty}</p>
          </div>
          <div>
            <p className="text-blue-200 font-medium">Department</p>
            <p className="text-white">{formData.department}</p>
          </div>
                         <div>
            <p className="text-blue-200 font-medium">Student Type</p>
            <p className="text-white">{formData.student_type}</p>
          </div>
          <div>
            <p className="text-blue-200 font-medium">level</p>
            <p className="text-white">{formData.level}</p>
          </div>
          <div>
            <p className="text-blue-200 font-medium">Campus</p>
            <p className="text-white">{formData.campus}</p>
          </div>
        </div>

        {formData.accessibilityNeeds && (
          <div className="border-t border-blue-300 pt-4">
            <p className="text-blue-200 font-medium">Accessibility Needs</p>
            <p className="text-white">{formData.accessibilityNeeds}</p>
          </div>
        )}
      </div>
    </div>
  );

  /**
   * Render Success Page
   */
  const renderSuccess = () => (
    <div className="text-center space-y-8">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-white" />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Account Created Successfully!
        </h2>
        <p className="text-blue-200 text-lg">
          Your account has been created successfully.
          <br />
          You can now log in and begin your accommodation process.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  /**
   * Render current step content
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderSuccess();
      default:
        return renderStep1();
    }
  };

  /**
   * Render navigation buttons
   */
  const renderNavigation = () => {
    if (currentStep === 5) return null; // Success page

    return (
      <div className="flex justify-between pt-8">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            currentStep === 1
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-slate-700 hover:bg-slate-600 text-white"
          }`}
        >
          Prev
        </button>

        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step Indicator */}
      {currentStep < 5 && renderStepIndicator()}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-200 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        {renderStepContent()}
        {renderNavigation()}
      </div>

      {/* Login Link */}
      {currentStep < 5 && (
        <div className="text-center mt-6">
          <span className="text-white">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign in here
          </button>
        </div>
      )}
    </div>
  );
}
