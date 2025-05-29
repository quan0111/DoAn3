import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CVRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Image
          src="/images/cv-recommendations.png"
          alt="CV Recommendations"
          width={400}
          height={300}
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">CV đề xuất</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Vui lòng kích hoạt dịch vụ Top Max Plus, Top Max, Top Pro, Top Eco Plus, Top Active, Top Boost, Top Hire hoặc
          Standard Extra để sử dụng tính năng CV đề xuất.
        </p>
        <p className="text-gray-600 mb-6">
          Tính năng sẽ được kích hoạt trong thời gian chạy Top Max Plus, Top Max, Top Pro, Top Eco Plus, Top Active, Top
          Boost, Top Hire hoặc Standard Extra.
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Kích hoạt dịch vụ</Button>
      </div>
    </div>
  )
}
