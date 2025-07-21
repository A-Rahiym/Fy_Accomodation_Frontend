"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "../components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export default function PayAccommodationPage() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)

  const accommodationFee = 45000
  const serviceFee = 2000
  const totalAmount = accommodationFee + serviceFee

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("Payment initiated! You will be redirected to the payment gateway.")
      // In a real app, you would redirect to payment gateway here
    }, 2000)
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pay Accommodation Fee</h1>
          <p className="text-gray-600 mt-2">Complete your accommodation payment to secure your hostel space</p>
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
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Proceed to Payment (₦${totalAmount.toLocaleString()})`}
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
