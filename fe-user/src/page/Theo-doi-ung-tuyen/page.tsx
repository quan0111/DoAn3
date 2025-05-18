import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { FileText, Calendar } from "lucide-react"

// Type definitions
interface Application {
  application_id: number
  job_id: number
  job_title: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  applied_at: string
  interview?: Interview
}

interface Interview {
  interview_id: number
  schedule_time: string
  platform: string
  meeting_url?: string
}

// Static mock data
const mockData: Application[] = [
  {
    application_id: 1,
    job_id: 101,
    job_title: "Marketing Specialist",
    status: "pending",
    applied_at: "2023-05-10",
    interview: {
      interview_id: 1,
      schedule_time: "2023-05-12 10:00",
      platform: "Zoom",
      meeting_url: "https://zoom.us/j/123456",
    },
  },
  {
    application_id: 2,
    job_id: 102,
    job_title: "Content Writer",
    status: "reviewed",
    applied_at: "2023-05-08",
  },
]

export default function ApplicationTrackerPage() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setApplications(mockData)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Theo dõi ứng tuyển</h1>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> Đơn ứng tuyển
              </CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <p className="text-gray-500">Chưa có đơn ứng tuyển nào.</p>
              ) : (
                <ul className="space-y-4">
                  {applications.map((app) => (
                    <li key={app.application_id} className="border-b pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{app.job_title}</p>
                          <p className="text-sm text-gray-500">Trạng thái: {app.status} | Ứng tuyển: {app.applied_at}</p>
                        </div>
                        <Button variant="outline">Xem chi tiết</Button>
                      </div>
                      {app.interview && (
                        <div className="mt-4">
                          <p className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> Phỏng vấn
                          </p>
                          <p className="text-sm text-gray-500">Thời gian: {app.interview.schedule_time}</p>
                          <p className="text-sm text-gray-500">Nền tảng: {app.interview.platform}</p>
                          {app.interview.meeting_url && (
                            <Button variant="outline" asChild className="mt-2">
                              <a href={app.interview.meeting_url} target="_blank" rel="noopener noreferrer">
                                Tham gia phỏng vấn
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
} 