"use client"

import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { ApplicationStatus } from "../../types"
import { useNavigate } from "react-router-dom"

interface PaymentStatusProps {
  status: ApplicationStatus
}

export function PaymentStatusCard({ status }: PaymentStatusProps) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">School Fees Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-8">
          <p className="text-orange-500 font-medium mb-6">
            {status.hasSubmittedPayment
              ? "Your School Fees payment have been verified"
              : "Your school fees payment has not been verified."}
          </p>
          {!status.hasSubmittedPayment && (
            <Button className="bg-slate-800 text-white hover:bg-slate-700" onClick={() => navigate("/verify-payment")}>
              Submit Evidence
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
