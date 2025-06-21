"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: string
}

export default function ToppyAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Đây là quy trình sàng lọc hồ sơ tự động của tôi! 😄",
      sender: "ai",
      timestamp: "15/06/2025 17:00",
    },
    {
      id: 2,
      text: "Tôi có thể giúp bạn <span className='font-semibold'>gắn nhãn cho CV</span> để tiết kiệm thời gian sơ tuyển. Bạn có thể tạo nhãn tùy chỉnh hoặc để tôi gợi ý dựa trên tin tuyển dụng!",
      sender: "ai",
      timestamp: "15/06/2025 17:01",
    },
    {
      id: 3,
      text: "Khi có CV mới, tôi sẽ <span className='font-semibold'>đọc toàn bộ và gắn nhãn tự động</span> cho những CV phù hợp với tiêu chí của bạn.",
      sender: "ai",
      timestamp: "15/06/2025 17:02",
    },
    {
      id: 4,
      text: "Tính năng này đang thử nghiệm cho <span className='font-semibold'>khách hàng thân thiết</span> (hạng Bạc trở lên) hoặc đã chạy ít nhất 1 dịch vụ Top Job.",
      sender: "ai",
      timestamp: "15/06/2025 17:03",
    },
    {
      id: 5,
      text: "Mình muốn biết thêm chi tiết! 👀",
      sender: "user",
      timestamp: "15/06/2025 17:04",
    },
    {
      id: 6,
      text: "Chắc chắn rồi! Nhấn <Button variant='link' className='text-green-600 p-0 inline'>Tìm hiểu thêm →</Button> để khám phá nhé!",
      sender: "ai",
      timestamp: "15/06/2025 17:05",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date().toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newUserMessage])

      // Phản hồi tự động từ Toppy AI dựa trên nội dung
      setTimeout(() => {
        let aiResponse: string
        const lowerCaseInput = inputMessage.toLowerCase()
        if (lowerCaseInput.includes("chi tiết")) {
          aiResponse = "Bạn muốn biết chi tiết? Tính năng này giúp bạn tiết kiệm 70% thời gian sơ tuyển! <Button variant='link' className='text-green-600 p-0 inline'>Tìm hiểu thêm →</Button>"
        } else if (lowerCaseInput.includes("giá") || lowerCaseInput.includes("mua")) {
          aiResponse = "Giá dịch vụ tùy thuộc vào gói bạn chọn. Liên hệ hỗ trợ để được tư vấn nhé! 📞"
        } else if (lowerCaseInput.includes("thử nghiệm")) {
          aiResponse = "Tính năng thử nghiệm hiện dành cho khách hàng hạng Bạc trở lên, kéo dài đến 30/06/2025. Bạn đã đủ điều kiện chưa? 😊"
        } else {
          aiResponse = "Cảm ơn bạn đã hỏi! Tôi không chắc về câu này, nhưng bạn có thể hỏi gì khác không? Hoặc nhấn <Button variant='link' className='text-green-600 p-0 inline'>Tìm hiểu thêm →</Button> để biết thêm!"
        }
        const newAiMessage: Message = {
          id: messages.length + 2,
          text: aiResponse,
          sender: "ai",
          timestamp: new Date().toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, newAiMessage])
      }, 1000) // Giả lập độ trễ phản hồi

      setInputMessage("")
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sàng lọc hồ sơ tự động bằng Toppy AI</h1>
      </div>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto h-[60vh] overflow-y-auto bg-white p-4 rounded-lg shadow-lg">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "ai" ? "justify-start" : "justify-end"}`}>
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.sender === "ai" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"
              }`}
              dangerouslySetInnerHTML={{ __html: message.text }}
            />
            <span className="text-xs text-gray-500 ml-2 mt-1">{message.timestamp}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2 max-w-3xl mx-auto">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Button
          onClick={handleSendMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg"
        >
          Gửi
        </Button>
      </div>
    </div>
  )
}