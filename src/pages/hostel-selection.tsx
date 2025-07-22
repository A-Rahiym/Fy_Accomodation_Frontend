/**
 * Hostel Selection Page with Eligibility Check and Real API Integration
 * Checks student eligibility before allowing hostel selection
 */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "../components/layout/page-layout"
import { ChoiceCard } from "../components/hostel/choice-card"
import { ConfirmationModal } from "../components/hostel/confirmation-modal"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { MapPin, Users, AlertCircle, CheckCircle, XCircle, CreditCard, FileText } from "lucide-react"
import type { HostelChoice, Hostel } from "../types"
import { useAuth } from "../contexts/auth-context"
import LoadingSpinner from "../components/ui/loading-spinner"
import { submitHostelChoices, checkStudentEligibility } from "../api/studentApi"
import { getHostelDetails } from "../api/hostelApi"

/**
 * Student Eligibility Interface
 **/
interface StudentEligibility {
  is_eligible: boolean
  has_paid: boolean
  already_submitted: boolean
}

export default function HostelSelectionPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Eligibility state
  const [eligibility, setEligibility] = useState<StudentEligibility | null>(null)
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(true)
  const [eligibilityError, setEligibilityError] = useState<string | null>(null)

  // State for hostel choices
  const [choices, setChoices] = useState<HostelChoice[]>([
    { choice: "first", hostel: null },
    { choice: "second", hostel: null },
    { choice: "third", hostel: null },
  ])

  // State for available hostels
  const [availableHostels, setAvailableHostels] = useState<Hostel[]>([])

  // UI state
  const [editingChoice, setEditingChoice] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingHostels, setIsLoadingHostels] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Check student eligibility on component mount
   */
  useEffect(() => {
    const checkEligibility = async () => {
      if (!user) return

      try {
        setIsCheckingEligibility(true)
        setEligibilityError(null)

        console.log("Checking eligibility for student:", user.studentId)

        // Call the eligibility check API
        const response = await checkStudentEligibility(user.id)

        console.log("Eligibility response:", response)
        setEligibility(response)
      } catch (error: any) {
        console.error("Failed to check eligibility:", error)
        setEligibilityError(error.message || "Failed to check eligibility. Please try again.")
      } finally {
        setIsCheckingEligibility(false)
      }
    }

    checkEligibility()
  }, [user])

  /**
   * Load hostels from API (only if eligible)
   */
  useEffect(() => {
    const loadHostels = async () => {
      if (!user || !eligibility) return

      // Only load hostels if student is eligible
      const isEligible = eligibility.is_eligible && eligibility.has_paid && !eligibility.already_submitted
      if (!isEligible) return

      try {
        setIsLoadingHostels(true)
        setError(null)

        console.log("Loading hostels for eligible student...")

        // Make actual API call using the hostelApi function
        const response = await getHostelDetails(user.gender, user.campus)

        // Handle response structure - check if response has hostels array or is direct array
        const hostelsData = response.hostels || response || []

        setAvailableHostels(hostelsData)
        console.log("Loaded hostels for", user.gender, "students on", user.campus, "campus:", hostelsData.length)
      } catch (error: any) {
        console.error("Failed to load hostels:", error)
        setError(error.message || "Failed to load hostels. Please try again.")
      } finally {
        setIsLoadingHostels(false)
      }
    }

    loadHostels()
  }, [user, eligibility])

  /**
   * Handle hostel selection for a specific choice
   */
  const handleHostelSelect = (choiceType: string, hostelId: string) => {
    const selectedHostel = availableHostels.find((h) => h.id === hostelId)
    if (selectedHostel) {
      setChoices((prev) =>
        prev.map((choice) => (choice.choice === choiceType ? { ...choice, hostel: selectedHostel } : choice)),
      )
      console.log(`Selected ${selectedHostel.name} as ${choiceType} choice`)
    }
    setEditingChoice(null)
  }

  /**
   * Handle editing a choice
   */
  const handleEdit = (choiceType: string) => {
    setEditingChoice(choiceType)
  }

  /**
   * Handle submission initiation
   */
  const handleSubmit = () => {
    const hasSelections = choices.some((choice) => choice.hostel !== null)
    if (hasSelections) {
      setShowConfirmation(true)
    }
  }

  /**
   * Handle confirmed submission - Uses real API call
   * Submits hostel choices to backend using submitHostelChoices
   */
  const handleConfirmSubmission = async () => {
    if (!user) return

    setIsSubmitting(true)

    try {
      // Prepare the choice data in the format expected by backend
      const choiceData = {
        choice1Id: choices.find((c) => c.choice === "first")?.hostel?.id || null,
        choice2Id: choices.find((c) => c.choice === "second")?.hostel?.id || null,
        choice3Id: choices.find((c) => c.choice === "third")?.hostel?.id || null,
      }

      console.log("Submitting hostel choices for", user.studentId, ":", choiceData)

      // Make actual API call using submitHostelChoices
      console.log(user.id, choiceData)
      const response = await submitHostelChoices(user.id, choiceData)

      console.log("Hostel choices submitted successfully:", response)

      // Show success message
      alert("Hostel selections submitted successfully!")

      // Optionally redirect to dashboard
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Submission error:", error)

      // Show user-friendly error message
      const errorMessage = error.response?.data?.message || error.message || "Failed to submit hostel choices"
      alert(`Error: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
      setShowConfirmation(false)
    }
  }

  /**
   * Generate eligibility message based on response
   */
  const getEligibilityMessage = (): string => {
    if (!eligibility) return ""

    const messages: string[] = []

    if (!eligibility.has_paid) {
      messages.push("You must complete your payment before selecting a hostel.")
    }

    if (eligibility.already_submitted) {
      messages.push("You have already submitted your hostel choices.")
    }

    if (!eligibility.is_eligible && eligibility.has_paid && !eligibility.already_submitted) {
      messages.push("You are not currently eligible for hostel selection.")
    }

    return messages.join(" ")
  }

  /**
   * Render eligibility action buttons
   */
  const renderEligibilityActions = () => {
    if (!eligibility) return null

    const buttons = []

    if (!eligibility.has_paid) {
      buttons.push(
        <Button key="payment" onClick={() => navigate("/pay-accommodation")} className="bg-blue-600 hover:bg-blue-700">
          <CreditCard className="w-4 h-4 mr-2" />
          Go to Payment Page
        </Button>,
      )
    }

    if (eligibility.already_submitted) {
      buttons.push(
        <Button key="view-choices" onClick={() => navigate("/dashboard")} variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          View Submitted Choices
        </Button>,
      )
    }

    return <div className="flex flex-col sm:flex-row gap-4 justify-center">{buttons}</div>
  }

  // Calculate selected count
  const selectedCount = choices.filter((choice) => choice.hostel !== null).length

  // Show loading spinner while checking eligibility
  if (isCheckingEligibility) {
    return (
      <PageLayout>
        <LoadingSpinner text="Checking your eligibility..." />
      </PageLayout>
    )
  }

  // Show eligibility error
  if (eligibilityError) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Error Checking Eligibility</h2>
          <p className="text-gray-600">{eligibilityError}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Check if student is eligible
  const isEligible = eligibility?.is_eligible && eligibility?.has_paid && !eligibility?.already_submitted

  // Show ineligibility screen
  if (eligibility && !isEligible) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Hostel Selection</h1>
            <p className="text-gray-600 mt-2">Check your eligibility status below</p>
          </div>

          {/* Eligibility Status Card */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <XCircle className="w-6 h-6" />
                Not Eligible for Hostel Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-red-700 text-lg">{getEligibilityMessage()}</p>

              {/* Eligibility Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="font-medium">General Eligibility</span>
                  <div className="flex items-center gap-2">
                    {eligibility.is_eligible ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={eligibility.is_eligible ? "text-green-600" : "text-red-600"}>
                      {eligibility.is_eligible ? "Eligible" : "Not Eligible"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="font-medium">Payment Status</span>
                  <div className="flex items-center gap-2">
                    {eligibility.has_paid ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={eligibility.has_paid ? "text-green-600" : "text-red-600"}>
                      {eligibility.has_paid ? "Paid" : "Not Paid"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="font-medium">Submission Status</span>
                  <div className="flex items-center gap-2">
                    {!eligibility.already_submitted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={!eligibility.already_submitted ? "text-green-600" : "text-red-600"}>
                      {eligibility.already_submitted ? "Already Submitted" : "Not Submitted"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {renderEligibilityActions()}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    )
  }

  // Show loading spinner while fetching hostels
  if (isLoadingHostels) {
    return (
      <PageLayout>
        <LoadingSpinner text="Loading available hostels..." />
      </PageLayout>
    )
  }

  // Show error state
  if (error) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Error Loading Hostels</h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Render normal hostel selection interface for eligible students
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hostel Selection</h1>
          <p className="text-gray-600 mt-2">
            Choose your preferred accommodation in order of preference. You can select up to 3 choices.
          </p>
        </div>

        {/* Eligibility Confirmed */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 text-sm font-medium">
                Eligibility confirmed! You can now select your hostel preferences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 text-blue-800">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">Gender: {user?.gender}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Campus: {user?.campus}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Selection Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-2">
            <p>• Select your hostels in order of preference (1st choice has highest priority)</p>
            <p>• You can select 1-3 hostels to increase your chances of allocation</p>
            <p>• Room allocation is based on availability and your preference order</p>
            <p>• Once submitted, your choices cannot be changed</p>
          </CardContent>
        </Card>

        {/* Selection Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Selections made: {selectedCount} of 3 | Available hostels: {availableHostels.length}
              </span>
              <div className="flex gap-2">
                {choices.map((choice, index) => (
                  <div
                    key={choice.choice}
                    className={`w-3 h-3 rounded-full ${choice.hostel ? "bg-green-500" : "bg-gray-300"}`}
                    title={`${choice.choice} choice ${choice.hostel ? "selected" : "not selected"}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {choices.map((choice) => (
            <ChoiceCard
              key={choice.choice}
              choice={choice}
              hostels={availableHostels}
              onSelect={(hostelId) => handleHostelSelect(choice.choice, hostelId)}
              onEdit={() => handleEdit(choice.choice)}
              isEditing={editingChoice === choice.choice}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button onClick={handleSubmit} disabled={selectedCount === 0 || isSubmitting} size="lg" className="px-8">
            {isSubmitting ? "Submitting..." : `Submit Hostel Selections (${selectedCount} selected)`}
          </Button>
        </div>

        {/* Available Hostels Reference */}
        <Card>
          <CardHeader>
            <CardTitle>
              Available Hostels ({user?.gender} - {user?.campus} Campus)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableHostels.map((hostel) => (
                <div key={hostel.id} className="p-4 border rounded-lg">
                  <h4 className="font-semibold">{hostel.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{hostel.gender}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hostel.campus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSubmission}
        choices={choices}
        isLoading={isSubmitting}
      />
    </PageLayout>
  )
}
