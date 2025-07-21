"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Check, ChevronDown, MapPin, Users } from "lucide-react"
import type { Hostel, HostelChoice } from "../../types"

interface ChoiceCardProps {
  choice: HostelChoice
  hostels: Hostel[]
  onSelect: (hostelId: string) => void
  onEdit: () => void
  isEditing: boolean
}

export function ChoiceCard({ choice, hostels, onSelect, onEdit, isEditing }: ChoiceCardProps) {
  const getChoiceLabel = (choiceType: string) => {
    switch (choiceType) {
      case "first":
        return "First Choice"
      case "second":
        return "Second Choice"
      case "third":
        return "Third Choice"
      default:
        return "Choice"
    }
  }

  const getChoiceColor = (choiceType: string) => {
    switch (choiceType) {
      case "first":
        return "bg-green-100 text-green-800 border-green-200"
      case "second":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "third":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className={`transition-all duration-200 ${choice.hostel ? "ring-2 ring-green-200" : "hover:shadow-md"}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {choice.hostel && <Check className="h-5 w-5 text-green-600" />}
            {getChoiceLabel(choice.choice)}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getChoiceColor(choice.choice)}`}>
            {choice.choice.charAt(0).toUpperCase() + choice.choice.slice(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!choice.hostel && !isEditing ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No hostel selected</p>
            <Button onClick={onEdit} variant="outline" className="w-full bg-transparent">
              <ChevronDown className="h-4 w-4 mr-2" />
              Select Hostel
            </Button>
          </div>
        ) : isEditing ? (
          <div className="space-y-4">
            <Select onValueChange={onSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a hostel" />
              </SelectTrigger>
              <SelectContent>
                {hostels.map((hostel) => (
                  <SelectItem key={hostel.id} value={hostel.id}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{hostel.name}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{hostel.gender}</span>
                        <MapPin className="h-3 w-3" />
                        <span>{hostel.campus}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900">{choice.hostel?.name}</h4>
              <div className="flex items-center gap-4 text-sm text-green-700 mt-2">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{choice.hostel?.gender}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{choice.hostel?.campus}</span>
                </div>
              </div>
            </div>
            <Button onClick={onEdit} variant="outline" size="sm" className="w-full bg-transparent">
              Change Selection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
