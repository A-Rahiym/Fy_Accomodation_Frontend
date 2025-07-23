"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "../components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useStudentStatus } from "../contexts/status-context" // ✅ Hook to get student status

export default function PayAccommodationPage() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const { status, loading } = useStudentStatus() // ✅ Get assigned_room_id

  const accommodationFee = 45000
  const serviceFee = 2000
  const totalAmount = accommodationFee + serviceFee

  const handlePayment = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert("Payment initiated! You will be redirected to the payment gateway.")
    }, 2000)
  }

  // 🔁 Show loading state while fetching status
  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <p className="text-gray-500">Loading your room assignment...</p>
        </div>
      </PageLayout>
    )
  }

  // ❌ Show this if student has NOT been assigned a room
  if (!status?.assigned_room_id) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto space-y-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Accommodation Payment</h1>
            <p className="text-gray-600 mt-2">You must be assigned a room before proceeding with payment.</p>
          </div>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-700">Room Assignment Pending</CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-800">
              <p>
                You have not been assigned a room yet. Please wait for your room allocation before making a payment.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => navigate("/Dashboard")}>
              Back to Hostel Dashboard
            </Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  // ✅ Main payment form (only shown if assigned_room_id exists)
  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pay Accommodation Fee</h1>
          <p className="text-gray-600 mt-2">
            Complete your accommodation payment to secure your hostel space
          </p>
        </div>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Accommodation Fee:</span>
              <span className="font-medium">₦{accommodationFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee:</span>
              <span className="font-medium">₦{serviceFee.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter phone number" />
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing..."
                : `Proceed to Payment (₦${totalAmount.toLocaleString()})`}
            </Button>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/hostel-selection")}>
            Back to Hostel Selection
          </Button>
          <Button variant="outline" onClick={() => navigate("/verify-payment")}>
            Already Paid? Verify Payment
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
