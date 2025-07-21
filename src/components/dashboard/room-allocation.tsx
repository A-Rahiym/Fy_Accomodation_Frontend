import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { ApplicationStatus } from "../../types"

interface RoomAllocationProps {
  status: ApplicationStatus
}

export function RoomAllocationCard({ status }: RoomAllocationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Room Allocated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-orange-500 font-medium">
            {status.roomAllocated ? "Room allocated: Block A, Room 101" : "You have not apply for accommodation"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
