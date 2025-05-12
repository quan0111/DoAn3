import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Calendar } from "lucide-react"

// Type definitions
interface Event {
  event_id: number
  title: string
  description: string
  start_date: string
  type: "online" | "offline"
  location?: string
  registration_url?: string
  status: "upcoming" | "ongoing" | "finished" | "cancelled"
}

// Static mock data
const mockData: Event[] = [
  {
    event_id: 1,
    title: "Ngày hội tuyển dụng IT 2023",
    description: "Gặp gỡ các công ty IT hàng đầu tại Hà Nội.",
    start_date: "2023-06-01 09:00",
    type: "offline",
    location: "Hà Nội",
    registration_url: "https://example.com/register",
    status: "upcoming",
  },
  {
    event_id: 2,
    title: "Webinar: Tương lai của AI",
    description: "Tìm hiểu về AI trong tuyển dụng.",
    start_date: "2023-05-20 14:00",
    type: "online",
    registration_url: "https://example.com/webinar",
    status: "upcoming",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setEvents(mockData)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Sự kiện việc làm</h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {events.length === 0 ? (
              <p className="text-gray-500">Chưa có sự kiện nào.</p>
            ) : (
              events.map((event) => (
                <Card key={event.event_id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-500 line-clamp-3">{event.description}</p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {event.start_date}
                    </p>
                    <p className="text-sm">Loại: {event.type}</p>
                    {event.location && <p className="text-sm">Địa điểm: {event.location}</p>}
                    <p className="text-sm">Trạng thái: {event.status}</p>
                    {event.registration_url && (
                      <Button asChild>
                        <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                          Đăng ký
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}