import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { ApplicationStatus } from "../../types"
import { useNavigate } from "react-router-dom"

interface ApplicationStatusProps {
  status: ApplicationStatus
}

export function ApplicationStatusCard({ status }: ApplicationStatusProps) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-800 text-white p-6 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-orange-400 font-medium">
              {status.hasApplied
                ? `Application submitted on ${status.applicationDate}`
                : "You have not applied for accommodation yet"}
            </p>
          </div>
          {!status.hasApplied && (
            <Button className="bg-white text-slate-800 hover:bg-gray-100" onClick={() => navigate("/hostel-selection")}>
              Apply
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
