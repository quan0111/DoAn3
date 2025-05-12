import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell } from "lucide-react"

// Type definitions
interface Notification {
  notification_id: number
  type: "application_update" | "job_recommendation" | "system_message" | "event_invitation"
  message: string
  is_read: boolean
  created_at: string
}

interface JobPreference {
  location?: string
  job_type?: string
}

// Static mock data
const mockData: { notifications: Notification[]; jobPreference: JobPreference } = {
  notifications: [
    {
      notification_id: 1,
      type: "application_update",
      message: "Đơn ứng tuyển của bạn đã được xem.",
      is_read: false,
      created_at: "2023-05-10",
    },
    {
      notification_id: 2,
      type: "job_recommendation",
      message: "Công việc mới: SEO Specialist.",
      is_read: true,
      created_at: "2023-05-09",
    },
  ],
  jobPreference: {
    location: "Hà Nội",
    job_type: "full-time",
  },
}

export default function JobAlertsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [jobPreference, setJobPreference] = useState<JobPreference>({})
  const [formData, setFormData] = useState<JobPreference>({})

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setNotifications(mockData.notifications)
    setJobPreference(mockData.jobPreference)
    setFormData(mockData.jobPreference)
  }, [])

  const handlePreferenceChange = (field: keyof JobPreference, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const savePreferences = () => {
    // Giả lập lưu preferences qua API
    console.log("Saving preferences:", formData)
    setJobPreference(formData)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Thông báo & Cảnh báo công việc</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
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
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt cảnh báo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Địa điểm</Label>
                    <Input
                      value={formData.location || ""}
                      onChange={(e) => handlePreferenceChange("location", e.target.value)}
                      placeholder="Nhập địa điểm..."
                    />
                  </div>
                  <div>
                    <Label>Loại công việc</Label>
                    <Input
                      value={formData.job_type || ""}
                      onChange={(e) => handlePreferenceChange("job_type", e.target.value)}
                      placeholder="Nhập loại công việc..."
                    />
                  </div>
                  <Button onClick={savePreferences}>Lưu cài đặt</Button>
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