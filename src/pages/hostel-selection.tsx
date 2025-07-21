"use client"

/**
 * Hostel Selection Page with Real API Integration
 * Fetches hostel data from backend API
 */

import { useState, useEffect } from "react"
import { PageLayout } from "../components/layout/page-layout"
import { ChoiceCard } from "../components/hostel/choice-card"
import { ConfirmationModal } from "../components/hostel/confirmation-modal"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { MapPin, Users, AlertCircle } from "lucide-react"
import type { HostelChoice, Hostel } from "../types"
import { useAuth } from "../contexts/auth-context"
import LoadingSpinner from "../components/ui/loading-spinner"
import {submitHostelChoices} from "../api/studentApi"
import { getHostelDetails } from  "../api/hostelApi"
// import { mockHostels } from "../data/mock_data"
// import { useNavigate } from "react-router-dom" // Uncomment if you want to redirect after submission

// Mock data matching your backend structure
// const mockHostels: Hostel[] = [
//   { id: "1", name: "Ahmadu Bello Hall", gender: "Male" as "Male" | "Female", campus: "Main" },
//   { id: "2", name: "Queen Amina Hall", gender: "Female" as "Male" | "Female", campus: "Main" },
//   { id: "3", name: "Ribadu Hall", gender: "Male" as "Male" | "Female", campus: "Main" },
//   { id: "4", name: "Kongo Hall", gender: "Female" as "Male" | "Female", campus: "Main" },
//   { id: "5", name: "Zaria Hall", gender: "Male" as "Male" | "Female", campus: "Main" },
// ]

/**
 * API function to get hostels - replace with your actual API call
 */
// const getAllHostels = async (gender: string, campus: string): Promise<Hostel[]> => {
//   try {
//     console.log(`INTEGRATION POINT: Fetching hostels for gender: ${gender}, campus: ${campus}`)

//     // TODO: Replace this with your actual API call
//     // const response = await fetch(`/api/hostels?gender=${gender}&campus=${campus}`)
//     // const data = await response.json()
//     // return data

//     // PLACEHOLDER: Simulate API delay and return mock data
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     return mockHostels
//   } catch (error) {
//     console.error("Error fetching hostels:", error)
//     throw new Error("Failed to fetch hostels")
//   }
// }

/**
 * Hostel Selection Page Component
 * Uses mock data - replace with API integration
 */
export default function HostelSelectionPage() {
  const { user } = useAuth()

  // State for hostel choices
  const [choices, setChoices] = useState<HostelChoice[]>([
    { choice: "first", hostel: null },
    { choice: "second", hostel: null },
    { choice: "third", hostel: null },
  ])

  // State for available hostels (using mock data)
  const [availableHostels, setAvailableHostels] = useState<Hostel[]>([])

  // UI state
  const [editingChoice, setEditingChoice] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingHostels, setIsLoadingHostels] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * PLACEHOLDER: Load mock hostels
   * TODO: Replace with actual API call
   */
  // useEffect(() => {
  //   const loadHostels = async () => {
  //     if (!user) return

  //     try {
  //       setIsLoadingHostels(true)
  //       setError(null)

  //       // Simulate API delay
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       // PLACEHOLDER: Filter hostels by gender
  //       const filteredHostels = mockHostels.filter((hostel) => hostel.gender === user.gender)

  //       setAvailableHostels(filteredHostels)
  //       console.log("PLACEHOLDER: Loaded hostels for", user.gender, "students:", filteredHostels.length)
  //     } catch (error) {
  //       console.error("Failed to load hostels:", error)
  //     } finally {
  //       setIsLoadingHostels(false)
  //     }
  //   }

  //   loadHostels()
  // }, [user])

  /**
   * Load hostels from API
   * Uses the actual API call instead of mock data
   */
  useEffect(() => {
    const loadHostels = async () => {
      if (!user) return

      try {
        setIsLoadingHostels(true)
        setError(null)

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
  }, [user])

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
      console.log(user.id , choiceData);
      const response = await submitHostelChoices(user.id, choiceData)
      console.log("Hostel choices submitted successfully:", response)

      // Show success message
      alert("Hostel selections submitted successfully!")

      // Optionally redirect to dashboard or update application status
      // navigate("/dashboard")
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

  // Calculate selected count
  const selectedCount = choices.filter((choice) => choice.hostel !== null).length

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

  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hostel Selection</h1>
          <p className="text-gray-600 mt-2">
            Choose your preferred accommodation in order of preference. You can select up to 3 choices.
          </p>
        </div>

        {/* API Integration Status */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <p className="text-green-800 text-sm">
              <strong>API Integration:</strong> This page is now connected to your backend API and fetches real hostel
              data.
            </p>
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
