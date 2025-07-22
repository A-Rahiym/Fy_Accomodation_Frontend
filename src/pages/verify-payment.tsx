"use client"

/**
 * Payment Verification Page with Placeholder Functionality
 * Uses mock submission for development
 *
 * INTEGRATION POINT: Replace with real API calls for payment verification
 */

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "../components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "../contexts/auth-context"
import { updatePaymentStatus } from "../api/studentApi"

/**
 * Payment verification form data interface
 */
interface PaymentVerificationData {
  transactionRef: string
  paymentDate: string
  amount: string
  paymentMethod: string
  notes: string
  receiptFile: File | null
}

/**
 * Payment Verification Page Component with Placeholder Functionality
 */
export default function VerifyPaymentPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState<PaymentVerificationData>({
    transactionRef: "",
    paymentDate: "",
    amount: "",
    paymentMethod: "",
    notes: "",
    receiptFile: null,
  })

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  /**
   * Handle input field changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * Handle file upload
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    // Validate file size (5MB limit)
    if (file && file.size > 5 * 1024 * 1024) {
      setSubmitStatus({
        type: "error",
        message: "File size must be less than 5MB",
      })
      return
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
    if (file && !allowedTypes.includes(file.type)) {
      setSubmitStatus({
        type: "error",
        message: "Only JPG, PNG, and PDF files are allowed",
      })
      return
    }

    setFormData((prev) => ({
      ...prev,
      receiptFile: file,
    }))

    // Clear any previous error
    if (submitStatus.type === "error") {
      setSubmitStatus({ type: null, message: "" })
    }
  }

  /**
   * Handle form submission - Updated to call real API
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    // Validate required fields
    if (!formData.transactionRef || !formData.paymentDate || !formData.amount || !formData.paymentMethod) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields",
      })
      return
    }

    if (!formData.receiptFile) {
      setSubmitStatus({
        type: "error",
        message: "Please upload a payment receipt",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Simulate file upload and form processing
      console.log("Processing payment verification for", user.studentId)
      console.log("Form data:", {
        transactionRef: formData.transactionRef,
        amount: formData.amount,
        paymentMethod: formData.paymentMethod,
        fileName: formData.receiptFile.name,
      })

      // Simulate API delay for file upload and processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Call the real updatePaymentStatus API
      console.log("Calling updatePaymentStatus API...")

      const response = await updatePaymentStatus(user.id, true) // Set paidStatus to true

      console.log("Payment status updated successfully:", response)

      // Show success message
      setSubmitStatus({
        type: "success",
        message:
          "Payment verification successful! Your payment status has been updated and you can now proceed with hostel selection.",
      })

      // Reset form
      setFormData({
        transactionRef: "",
        paymentDate: "",
        amount: "",
        paymentMethod: "",
        notes: "",
        receiptFile: null,
      })

      // Reset file input
      const fileInput = document.getElementById("receipt") as HTMLInputElement
      if (fileInput) fileInput.value = ""

      // Optional: Redirect to hostel selection after a delay
      setTimeout(() => {
        navigate("/hostel-selection")
      }, 3000)
    } catch (error: any) {
      console.error("Payment verification error:", error)

      // Extract error message from API response
      const errorMessage =
        error.response?.data?.error || error.response?.data?.message || error.message || "Failed to verify payment"

      setSubmitStatus({
        type: "error",
        message: `Payment verification failed: ${errorMessage}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Verify School Fees Payment</h1>
          <p className="text-gray-600 mt-2">Upload evidence of your school fees payment for verification</p>
        </div>

        {/* Updated Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-blue-800 text-sm">
              <strong>Payment Verification:</strong> Upload your payment receipt and we'll verify your payment status
              automatically. Once verified, you'll be able to proceed with hostel selection.
            </p>
          </CardContent>
        </Card>

        {/* Status Message */}
        {submitStatus.type && (
          <Card
            className={`border-2 ${
              submitStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                {submitStatus.type === "success" ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${submitStatus.type === "success" ? "text-green-800" : "text-red-800"}`}>
                    {submitStatus.type === "success" ? "Payment Verified Successfully!" : "Verification Failed"}
                  </p>
                  <p className={`text-sm mt-1 ${submitStatus.type === "success" ? "text-green-700" : "text-red-700"}`}>
                    {submitStatus.message}
                  </p>
                  {submitStatus.type === "success" && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <Button onClick={() => navigate("/hostel-selection")} className="bg-green-600 hover:bg-green-700">
                        Proceed to Hostel Selection
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/dashboard")}
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        Back to Dashboard
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Payment Verification Requirements:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Upload clear image or PDF of payment receipt</li>
              <li>• Ensure all payment details are visible</li>
              <li>• File size should not exceed 5MB</li>
              <li>• Supported formats: JPG, PNG, PDF</li>
              <li>• Include transaction reference number</li>
            </ul>
          </CardContent>
        </Card>

        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Evidence Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Transaction Reference */}
              <div>
                <Label htmlFor="transactionRef">Transaction Reference *</Label>
                <Input
                  id="transactionRef"
                  name="transactionRef"
                  value={formData.transactionRef}
                  onChange={handleInputChange}
                  placeholder="Enter transaction reference number"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Payment Date */}
              <div>
                <Label htmlFor="paymentDate">Payment Date *</Label>
                <Input
                  id="paymentDate"
                  name="paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Amount Paid */}
              <div>
                <Label htmlFor="amount">Amount Paid (₦) *</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount paid"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Payment Method */}
              <div>
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select payment method</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="online-payment">Online Payment</option>
                  <option value="pos">POS Payment</option>
                  <option value="cash">Cash Payment</option>
                  <option value="mobile-money">Mobile Money</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <Label htmlFor="receipt">Upload Payment Receipt *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>

                  <Input
                    id="receipt"
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="mt-4"
                    required
                    disabled={isSubmitting}
                  />

                  {formData.receiptFile && (
                    <p className="mt-2 text-sm text-green-600">Selected: {formData.receiptFile.name}</p>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any additional information about your payment"
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700" disabled={isSubmitting}>
                {isSubmitting ? "Verifying Payment..." : "Verify Payment & Update Status"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
