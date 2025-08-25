import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { checkStudentRoomInfo } from "../api/studentApi"; // your API call

interface RoomInfo {
  block_name: string;
  hostel_name: string;
  room_name: string;
}

interface RoomContextType {
  roomInfo: RoomInfo | null;
  loading: boolean;
  error: string | null;
  fetchRoomInfo: (studentId: string) => Promise<void>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoomInfo = async (studentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await checkStudentRoomInfo(studentId);
      console.log(response.data)
      setRoomInfo(response.data); // { block_name, hostel_name, room_name }
    } catch (err: any) {
      setError(err.message || "Failed to fetch room information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoomContext.Provider value={{ roomInfo, loading, error, fetchRoomInfo }}>
      {children}
    </RoomContext.Provider>
  )
};

// Custom hook for easy usage
export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};
