import { createContext, useContext, useEffect, useState } from "react"
import { getStudentStatus } from "../api/student"
import { useAuth } from "./auth-context"
import type { StudentStatus } from "../types"

interface StudentStatusContextType {
  status: StudentStatus | null
  loading: boolean
  error: string | null
  fetchStatus: () => Promise<void>
}

const StudentStatusContext = createContext<StudentStatusContextType | undefined>(undefined)

export const StudentStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [status, setStatus] = useState<StudentStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = async () => {
    if (!user?.id) return
    setLoading(true)
    try {
      const res = await getStudentStatus(user.id)
      setStatus(res)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchStatus()
    }
  }, [user?.id])

  return (
    <StudentStatusContext.Provider value={{ status, loading, error, fetchStatus }}>
      {children}
    </StudentStatusContext.Provider>
  )
}

export const useStudentStatus = () => {
  const context = useContext(StudentStatusContext)
  if (!context) throw new Error("useStudentStatus must be used within StudentStatusProvider")
  return context
}
