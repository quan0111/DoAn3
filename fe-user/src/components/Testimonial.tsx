import { Star } from "lucide-react"
import axios from "axios"
import { useState, useEffect } from "react"

interface FeedBack {
  feedback_id: string
  user_id: string
  full_name: string
  Desired_position: string
  avatar_url: string
  subject: string
  message: string
  rating: number
  created_at: Date
}

export function Testimonials() {
  const [feedbacks, setFeedbacks] = useState<FeedBack[]>([])

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/feedbackss")
        setFeedbacks(response.data)
      } catch (error) {
        alert("Lỗi khi fetch feedbacks: " + error)
      }
    }

    fetchFeedbacks()
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Người Dùng Nói Gì</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tham gia cùng hàng nghìn người tìm việc đã thành công với TopCV.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">Không có phản hồi nào để hiển thị.</p>
          ) : (
            feedbacks.map((fb) => (
              <div
                key={fb.feedback_id}
                className="flex flex-col items-start gap-4 rounded-lg border p-6 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array(fb.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
                <h1 className="text-black-500 text-xl ">{fb.subject}</h1>
                <p className="text-gray-500">{fb.message}</p>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    {fb.avatar_url ? (
                      <img
                        src={fb.avatar_url}
                        alt={fb.full_name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{fb.full_name}</h4>
                    <p className="text-sm text-gray-500">{fb.Desired_position}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
