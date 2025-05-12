import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Bell, Bookmark, Calendar, FileText } from "lucide-react"

// Type definitions
interface Application {
  application_id: number
  job_id: number
  job_title: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  applied_at: string
}

interface SavedJob {
  job_id: number
  job_title: string
  saved_at: string
}

interface Notification {
  notification_id: number
  type: "application_update" | "job_recommendation" | "system_message"
  message: string
  is_read: boolean
  created_at: string
}

interface Interview {
  interview_id: number
  job_title: string
  schedule_time: string
  platform: string
  meeting_url?: string
}

// Static mock data
const mockData: { applications: Application[]; savedJobs: SavedJob[]; notifications: Notification[]; interviews: Interview[] } = {
  applications: [
    { application_id: 1, job_id: 101, job_title: "Marketing Specialist", status: "pending", applied_at: "2023-05-10" },
    { application_id: 2, job_id: 102, job_title: "Content Writer", status: "reviewed", applied_at: "2023-05-08" },
  ],
  savedJobs: [
    { job_id: 103, job_title: "Digital Marketing Manager", saved_at: "2023-05-09" },
  ],
  notifications: [
    { notification_id: 1, type: "application_update", message: "Đơn ứng tuyển của bạn đã được xem.", is_read: false, created_at: "2023-05-10" },
    { notification_id: 2, type: "job_recommendation", message: "Công việc mới: SEO Specialist.", is_read: true, created_at: "2023-05-09" },
  ],
  interviews: [
    { interview_id: 1, job_title: "Marketing Specialist", schedule_time: "2023-05-12 10:00", platform: "Zoom", meeting_url: "https://zoom.us/j/123456" },
  ],
}

export default function CandidateDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [interviews, setInterviews] = useState<Interview[]>([])

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setApplications(mockData.applications)
    setSavedJobs(mockData.savedJobs)
    setNotifications(mockData.notifications)
    setInterviews(mockData.interviews)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Bảng điều khiển ứng viên</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
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
                        <li key={app.application_id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{app.job_title}</p>
                            <p className="text-sm text-gray-500">Trạng thái: {app.status} | Ứng tuyển: {app.applied_at}</p>
                          </div>
                          <Button variant="outline">Xem chi tiết</Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5" /> Công việc đã lưu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savedJobs.length === 0 ? (
                    <p className="text-gray-500">Chưa có công việc nào được lưu.</p>
                  ) : (
                    <ul className="space-y-4">
                      {savedJobs.map((job) => (
                        <li key={job.job_id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{job.job_title}</p>
                            <p className="text-sm text-gray-500">Lưu: {job.saved_at}</p>
                          </div>
                          <Button variant="outline">Xem công việc</Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" /> Thông báo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {notifications.length === 0 ? (
                    <p className="text-gray-500">Chưa có thông báo nào.</p>
                  ) : (
                    <ul className="space-y-4">
                      {notifications.map((notif) => (
                        <li key={notif.notification_id} className="border-b pb-2">
                          <p className={`text-sm ${notif.is_read ? "text-gray-500" : "font-medium"}`}>{notif.message}</p>
                          <p className="text-xs text-gray-400">{notif.created_at}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Phỏng vấn sắp tới
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {interviews.length === 0 ? (
                    <p className="text-gray-500">Chưa có phỏng vấn nào.</p>
                  ) : (
                    <ul className="space-y-4">
                      {interviews.map((interview) => (
                        <li key={interview.interview_id} className="border-b pb-2">
                          <p className="font-medium">{interview.job_title}</p>
                          <p className="text-sm text-gray-500">Thời gian: {interview.schedule_time}</p>
                          <p className="text-sm text-gray-500">Nền tảng: {interview.platform}</p>
                          {interview.meeting_url && (
                            <Button variant="outline" asChild className="mt-2">
                              <a href={interview.meeting_url} target="_blank" rel="noopener noreferrer">
                                Tham gia
                              </a>
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}