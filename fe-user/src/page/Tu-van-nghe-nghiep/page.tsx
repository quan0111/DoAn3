import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

// Type definitions
interface AIQuery {
  query_id: number
  question: string
  answer?: string
  feedback_rating?: number
  asked_at: string
}

// Static mock data
const mockData: AIQuery[] = [
  {
    query_id: 1,
    question: "Làm thế nào để viết CV thu hút?",
    answer: "Để viết CV thu hút, bạn nên tập trung vào thành tựu cụ thể, sử dụng từ khóa phù hợp với ngành, và trình bày rõ ràng.",
    feedback_rating: 4,
    asked_at: "2023-05-10",
  },
]

export default function CareerCounselingPage() {
  const [queries, setQueries] = useState<AIQuery[]>([])
  const [newQuestion, setNewQuestion] = useState<string>("")

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setQueries(mockData)
  }, [])

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) return
    // Giả lập gửi câu hỏi qua API
    const newQuery: AIQuery = {
      query_id: queries.length + 1,
      question: newQuestion,
      answer: "Đang xử lý câu hỏi của bạn...",
      asked_at: new Date().toISOString().split("T")[0],
    }
    setQueries([newQuery, ...queries])
    setNewQuestion("")
  }

  const handleRating = (queryId: number, rating: number) => {
    // Giả lập lưu đánh giá qua API
    setQueries(queries.map((q) => (q.query_id === queryId ? { ...q, feedback_rating: rating } : q)))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="mb-8 text-2xl font-bold">Tư vấn nghề nghiệp</h1>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Gửi câu hỏi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
              />
              <Button onClick={handleSubmitQuestion}>Gửi câu hỏi</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử câu hỏi</CardTitle>
            </CardHeader>
            <CardContent>
              {queries.length === 0 ? (
                <p className="text-gray-500">Chưa có câu hỏi nào.</p>
              ) : (
                <ul className="space-y-4">
                  {queries.map((query) => (
                    <li key={query.query_id} className="border-b pb-4">
                      <p className="font-medium">Câu hỏi: {query.question}</p>
                      <p className="text-sm text-gray-500">Trả lời: {query.answer || "Chưa có trả lời"}</p>
                      <p className="text-sm text-gray-400">Hỏi lúc: {query.asked_at}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <p className="text-sm">Đánh giá:</p>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 cursor-pointer ${star <= (query.feedback_rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                            onClick={() => handleRating(query.query_id, star)}
                          />
                        ))}
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