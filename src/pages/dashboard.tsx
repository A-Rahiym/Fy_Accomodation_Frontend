import { PageLayout } from "../components/layout/page-layout"
import { useAuth } from "../contexts/auth-context"

// Import dashboard-specific components
import { ProgressIndicator } from "../components/dashboard/progress-indicator"
import { StudentProfile } from "../components/dashboard/student-profile"
import { ApplicationStatusCard } from "../components/dashboard/application-status"
import { PaymentStatusCard } from "../components/dashboard/payment-status"
import { AnnouncementsCard } from "../components/dashboard/announcements"
import { RoomAllocationCard } from "../components/dashboard/room-allocation"

// Import mock data
import { mockApplicationStatus, mockProgressSteps, mockAnnouncements } from "../data/mock-data"

/**
 * Dashboard Page Component
 * Main dashboard interface showing student information and application status
 */
export default function DashboardPage() {
  // Get current user data from authentication context
  const { user } = useAuth()

  // Don't render if user is not available (handled by PageLayout)
  if (!user) {
    return null
  }

  return (
    <PageLayout>
      {/* Main dashboard grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area - takes up 2/3 of the width on large screens */}
        <div className="lg:col-span-2 space-y-8">
          {/* Dashboard header with title and progress indicator */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">My Dashboard</h2>
            {/* Progress indicator showing application completion status */}
            <ProgressIndicator steps={mockProgressSteps} />
          </div>

          {/* Student profile card displaying personal information */}
          <StudentProfile studentInfo={user} />

          {/* Application status card showing accommodation application progress */}
          <ApplicationStatusCard status={mockApplicationStatus} />

          {/* Payment status card showing school fees payment status */}
          <PaymentStatusCard status={mockApplicationStatus} />
        </div>

        {/* Sidebar - takes up 1/3 of the width on large screens */}
        <div className="space-y-6">
          {/* Announcements card displaying important notices */}
          <AnnouncementsCard announcements={mockAnnouncements} />

          {/* Room allocation card showing current accommodation status */}
          <RoomAllocationCard status={mockApplicationStatus} />
        </div>
      </div>
    </PageLayout>
  )
}
