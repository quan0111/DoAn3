"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Insight {
  id: number
  title: string
  description: string
  trend?: string
  candidate_behavior?: string
  latest_update?: string
  created_at: string
  image?: string
}

export default function InsightsPage() {
  const [insights] = useState<Insight[]>([
    {
      id: 1,
      title: "Xu hướng tuyển dụng 2025",
      description: "Năm 2025 chứng kiến sự gia tăng nhu cầu trong các ngành công nghệ, chăm sóc sức khỏe và năng lượng tái tạo.",
      trend: "Ngành công nghệ dẫn đầu với mức lương trung bình tăng 15%.",
      candidate_behavior: "Ứng viên ưu tiên công việc từ xa, với 60% chọn linh hoạt thời gian.",
      latest_update: "Cập nhật thông tin mới nhất về thị trường lao động vào ngày 14/06/2025.",
      created_at: "2025-06-14",
      image: "public/topcv-insights-2020-cover.jpg",
    },
    {
      id: 2,
      title: "Hành vi tìm việc của ứng viên",
      description: "Ứng viên ngày càng quan tâm đến phúc lợi và văn hóa doanh nghiệp hơn là chỉ lương.",
      candidate_behavior: "Thời gian tìm việc trung bình giảm xuống còn 3 tuần nhờ công cụ AI.",
      created_at: "2025-06-13",
      image: "public/topcv-insights-2020-cover.jpg",
    },
    {
      id: 3,
      title: "Nhu cầu kỹ năng mới",
      description: "Các kỹ năng liên quan đến AI và dữ liệu lớn đang trở thành yêu cầu bắt buộc trong tuyển dụng.",
      trend: "Doanh nghiệp ưu tiên ứng viên có chứng chỉ AI, tăng 25% so với năm trước.",
      candidate_behavior: "70% ứng viên đang học thêm khóa học trực tuyến để nâng cao kỹ năng.",
      latest_update: "Cập nhật ngày 15/06/2025, đúng thời điểm hiện tại.",
      created_at: "2025-06-15",
      image: "public/topcv-insights-2020-cover.jpg",
    },
    {
      id: 4,
      title: "Thị trường lao động toàn cầu",
      description: "Các công ty quốc tế đang mở rộng tuyển dụng tại Việt Nam với mức lương cạnh tranh.",
      trend: "Ngành IT toàn cầu tăng 20% nhu cầu tại Việt Nam.",
      candidate_behavior: "Ứng viên trẻ tuổi (dưới 30) chiếm 50% ứng tuyển quốc tế.",
      created_at: "2025-06-14",
      image: "public/topcv-insights-2020-cover.jpg",
    },
  ])

  return (
    <div className="space-y-6 p-4">
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">TopCV Insights</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Khám phá những bí kíp và thông tin hữu ích về xu hướng thị trường tuyển dụng, hành vi tìm việc của ứng viên, giúp bạn nâng cao hiệu quả tuyển dụng.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <Card key={insight.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <img
                src={insight.image || "public/topcv-insights-2020-cover.jpg"}
                alt={insight.title}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-semibold mb-2 text-green-700">{insight.title}</CardTitle>
              <p className="text-gray-600 mb-4">{insight.description}</p>
              <ul className="text-sm text-gray-700 space-y-2">
                {insight.trend && <li><strong>Xu hướng:</strong> {insight.trend}</li>}
                {insight.candidate_behavior && <li><strong>Hành vi ứng viên:</strong> {insight.candidate_behavior}</li>}
                {insight.latest_update && <li><strong>Cập nhật mới:</strong> {insight.latest_update}</li>}
              </ul>
              <p className="text-xs text-gray-500 mt-4">Cập nhật: {insight.created_at}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-600 mb-6">
          Mua dịch vụ ngay để khám phá tính năng ưu việt và cập nhật thông tin tức thì cùng TopCV!
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
          Mua dịch vụ ngay
        </Button>
      </div>
    </div>
  )
}