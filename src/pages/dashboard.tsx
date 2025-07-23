import { PageLayout } from "../components/layout/page-layout"
import { useAuth } from "../contexts/auth-context"
import { useStudentStatus } from "../contexts/status-context"

import { ProgressIndicator } from "../components/dashboard/progress-indicator"
import { StudentProfile } from "../components/dashboard/student-profile"
import { ApplicationStatusCard } from "../components/dashboard/application-status"
import { PaymentStatusCard } from "../components/dashboard/payment-status"
import { AnnouncementsCard } from "../components/dashboard/announcements"
import { RoomAllocationCard } from "../components/dashboard/room-allocation"
import { mockProgressSteps, mockAnnouncements } from "../data/mock-data"

export default function DashboardPage() {
  const { user } = useAuth()
  const { status, loading } = useStudentStatus()

  if (!user || loading || !status) return null

  const hasApplied =
    status.choice1_hostel !== null || status.choice2_hostel !== null || status.choice3_hostel !== null

  const appStatus = {
    hasApplied,
    applicationDate: "July 20, 2025", // Replace with actual timestamp from backend if available
    roomAllocated: status.assigned_room_id !== null,
    hasSubmittedPayment: status.has_paid,
  }



  return (
    <PageLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">My Dashboard</h2>
            <ProgressIndicator steps={mockProgressSteps} />
          </div>

          <StudentProfile studentInfo={user} />
          <ApplicationStatusCard status={appStatus} />
          <PaymentStatusCard status={appStatus} />
        </div>

        <div className="space-y-6">
          <AnnouncementsCard announcements={mockAnnouncements} />
          <RoomAllocationCard status={appStatus} />
        </div>
        {console.log(status)}
      </div>
    </PageLayout>
  )
}
