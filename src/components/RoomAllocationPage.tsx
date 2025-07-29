"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { MapPin, Building, Home, CreditCard, Loader2 } from "lucide-react"
import type { RoomInfo } from "../types/index"

// Import your API function
import { checkStudentRoomInfo } from "../api/studentApi"

interface RoomAllocationPageProps {
  studentId: string
}

export function RoomAllocationPage({ studentId }: RoomAllocationPageProps) {
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await checkStudentRoomInfo(studentId)
        console.log("Room Info:",response.data)
        setRoomInfo(response.data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch room information")
      } finally {
        setLoading(false)
      }
    }

    if (studentId) {
      fetchRoomInfo()
    }
  }, [studentId])

  const handlePaymentClick = () => {
    navigate("/pay-accommodation")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading room information...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-red-600">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!roomInfo) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">No Room Allocated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800">
              No room has been allocated to you yet. Please contact the accommodation office for assistance.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Home className="h-6 w-6" />
            Your Room Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Room Information Display */}
            <div className="bg-slate-800 text-white p-6 rounded-lg space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-blue-400" />
                <div>
                  <h4 className="font-semibold text-lg">{roomInfo.hostel_name}</h4>
                  <p className="text-sm text-gray-300">Hostel</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <div>
                  <h4 className="font-semibold text-lg">{roomInfo.block_name}</h4>
                  <p className="text-sm text-gray-300">Block</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Home className="h-5 w-5 text-purple-400" />
                <div>
                  <h4 className="font-semibold text-lg">{roomInfo.room_name}</h4>
                  <p className="text-sm text-gray-300">Room Number</p>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Room Summary</h5>
              <p className="text-blue-800 text-sm">
                You have been allocated to <strong>Room {roomInfo.room_name}</strong> in{" "}
                <strong>{roomInfo.block_name}</strong> of <strong>{roomInfo.hostel_name}</strong>.
              </p>
            </div>

            {/* Payment Section */}
            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">Complete Your Payment</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Secure your room by completing the accommodation payment.
                  </p>
                </div>
                <Button
                  onClick={handlePaymentClick}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <CreditCard className="h-4 w-4" />
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Please complete your payment within 7 days to secure your room allocation.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Keep your payment receipt as proof of accommodation fee payment.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Contact the accommodation office if you have any questions about your allocation.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
