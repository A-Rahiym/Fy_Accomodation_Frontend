"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Users, MapPin, Check } from "lucide-react"
import type { StudentStatus } from "../../types"

interface HostelChoicesSummaryProps {
  status: StudentStatus
}

const choiceLabels = {
  first: "First Choice",
  second: "Second Choice",
  third: "Third Choice",
}

const choiceStyles = {
  first: "bg-green-100 text-green-800 border-green-200",
  second: "bg-blue-100 text-blue-800 border-blue-200",
  third: "bg-orange-100 text-orange-800 border-orange-200",
}

export function HostelChoicesSummary({ status }: HostelChoicesSummaryProps) {
  const choices = [
    { key: "first", hostel: status.choice1_hostel },
    { key: "second", hostel: status.choice2_hostel },
    { key: "third", hostel: status.choice3_hostel },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Your Submitted Hostel Choices</h3>
      {choices.map(({ key, hostel }) => (
        <Card key={key} className="transition-all duration-200 ring-1 ring-green-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                {hostel && <Check className="h-5 w-5 text-green-600" />}
                {choiceLabels[key as keyof typeof choiceLabels]}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full border ${choiceStyles[key as keyof typeof choiceStyles]}`}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hostel ? (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900">{hostel.name}</h4>
                <div className="flex items-center gap-4 text-sm text-green-700 mt-2">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{hostel.gender}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{hostel.campus}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No hostel selected for this choice.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
