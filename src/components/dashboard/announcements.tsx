import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { Announcement } from "../../types"

interface AnnouncementsProps {
  announcements: Announcement[]
}

export function AnnouncementsCard({ announcements }: AnnouncementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-slate-800 text-white p-6 rounded-lg">
              <h4 className="font-semibold mb-2">{announcement.title}</h4>
              <p className="text-sm leading-relaxed">{announcement.content}</p>
              <p className="text-xs text-gray-300 mt-2">{announcement.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
