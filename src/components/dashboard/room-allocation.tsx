import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { ApplicationStatus } from "../../types";

interface RoomAllocationProps {
  status: ApplicationStatus;
}

export function RoomAllocationCard({ status }: RoomAllocationProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/room-allocated");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Room Allocated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 space-y-4">
          <p className="text-orange-500 font-medium">
            {status.roomAllocated
              ? `Room allocated: `
              : "You have not been assigned a room yet"}
          </p>
          <Button onClick={handleNavigate} disabled={!status.roomAllocated}>
            View Room Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
