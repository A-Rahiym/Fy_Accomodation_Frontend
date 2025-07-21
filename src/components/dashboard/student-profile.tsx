import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent } from "../ui/card"
import { User } from "lucide-react"
import type { StudentInfo } from "../../types"

interface StudentProfileProps {
  studentInfo: StudentInfo
}

export function StudentProfile({ studentInfo }: StudentProfileProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={studentInfo.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-slate-800 text-white text-2xl">
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{studentInfo.name}</h3>
            <div className="flex items-center space-x-8">
              <div>
                <span className="text-gray-600">Dept:</span>
                <span className="ml-2 font-medium">{studentInfo.department}</span>
              </div>
              <div className="text-lg font-mono font-bold">{studentInfo.studentId}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
