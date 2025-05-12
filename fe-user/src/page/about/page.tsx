import { useState } from "react" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Type definitions
interface Feedback {
  subject: string
  message: string
}

// Static mock data
const mockData: Feedback = {
  subject: "",
  message: "",
}

export default function AboutContactPage() {
  const [feedback, setFeedback] = useState<Feedback>(mockData)

  const handleChange = (field: keyof Feedback, value: string) => {
    setFeedback((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Giả lập gửi phản hồi qua API
    console.log("Submitting feedback:", feedback)
    setFeedback(mockData)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Giới thiệu & Liên hệ</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Giới thiệu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Chúng tôi là nền tảng tuyển dụng hàng đầu, kết nối ứng viên với nhà tuyển dụng thông qua các công cụ hiện đại như phân tích CV, tìm kiếm công việc, và tư vấn nghề nghiệp.
                </p>
                <p className="text-sm mt-4">
                  Sứ mệnh của chúng tôi là giúp mọi người tìm được công việc phù hợp và hỗ trợ doanh nghiệp tuyển dụng nhân tài hiệu quả.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Chủ đề</label>
                  <Input
                    value={feedback.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Nhập chủ đề..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Nội dung</label>
                  <Textarea
                    value={feedback.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Nhập nội dung liên hệ..."
                  />
                </div>
                <Button onClick={handleSubmit}>Gửi liên hệ</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}