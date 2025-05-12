import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Type definitions
interface Feedback {
  subject: string
  message: string
  rating: number
}

// Static mock data (không cần fetch cho form gửi)
const mockData: Feedback = {
  subject: "",
  message: "",
  rating: 0,
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback>(mockData)

  const handleChange = (field: keyof Feedback, value: string | number) => {
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
          <h1 className="mb-8 text-2xl font-bold">Phản hồi & Hỗ trợ</h1>
          <Card>
            <CardHeader>
              <CardTitle>Gửi phản hồi</CardTitle>
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
                  placeholder="Nhập phản hồi của bạn..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Đánh giá</label>
                <Select onValueChange={(value) => handleChange("rating", parseInt(value))} defaultValue="0">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn số sao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Chọn số sao</SelectItem>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <SelectItem key={star} value={star.toString()}>
                        {star} sao
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmit}>Gửi phản hồi</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}