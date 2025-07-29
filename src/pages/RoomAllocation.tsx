"use client";

import { useParams } from "react-router-dom";
import { RoomAllocationPage } from "../components/RoomAllocationPage";
import { useAuth } from "../contexts/auth-context";
import { PageLayout } from "../components/layout/page-layout";

export function RoomAllocation() {
  const { user } = useAuth();
  const { studentId } = useParams<{ studentId: string }>();
  if (!user.id) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Invalid Student ID
          </h2>
          <p className="text-gray-600">
            Please provide a valid student ID to view room allocation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <RoomAllocationPage studentId={user?.id} />
      </div>
    </PageLayout>
  );
}
