import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"

// Type definitions
interface Interview {
  interview_id: number
  application_id: number
  job_title: string
  schedule_time: string
  platform: string
  meeting_url?: string
  notes?: string
}

// Static mock data
const mockData: Interview[] = [
  {
    interview_id: 1,
    application_id: 1,
    job_title: "Marketing Specialist",
    schedule_time: "2023-05-12 10:00",
    platform: "Zoom",
    meeting_url: "https://zoom.us/j/123456",
    notes: "Chuẩn bị câu hỏi về SEO.",
  },
]

export default function InterviewManagementPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [notes, setNotes] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setInterviews(mockData)
    setNotes(mockData.reduce((acc, interview) => ({ ...acc, [interview.interview_id]: interview.notes || "" }), {}))
  }, [])

  const handleNotesChange = (interviewId: number, value: string) => {
    setNotes((prev) => ({ ...prev, [interviewId]: value }))
  }

  const saveNotes = (interviewId: number) => {
    // Giả lập lưu ghi chú qua API
    console.log(`Saving notes for interview ${interviewId}: ${notes[interviewId]}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Quản lý phỏng vấn</h1>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Lịch phỏng vấn
              </CardTitle>
            </CardHeader>
            <CardContent>
              {interviews.length === 0 ? (
                <p className="text-gray-500">Chưa có phỏng vấn nào.</p>
              ) : (
                <ul className="space-y-4">
                  {interviews.map((interview) => (
                    <li key={interview.interview_id} className="border-b pb-4">
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
                      <div className="mt-4">
                        <label className="text-sm font-medium">Ghi chú</label>
                        <Textarea
                          value={notes[interview.interview_id] || ""}
                          onChange={(e) => handleNotesChange(interview.interview_id, e.target.value)}
                          placeholder="Nhập ghi chú..."
                          className="mt-1"
                        />
                        <Button className="mt-2" onClick={() => saveNotes(interview.interview_id)}>
                          Lưu ghi chú
                        </Button>
                      </div>
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