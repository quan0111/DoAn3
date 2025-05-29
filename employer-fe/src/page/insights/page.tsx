import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Image
          src="/images/insights-illustration.png"
          alt="TopCV Insights"
          width={400}
          height={300}
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">TopCV Insights</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          TopCV Insights cung cấp những bí kíp, thông tin hữu ích về Xu hướng thị trường tuyển dụng, Hành vi tìm việc
          của ứng viên,... giúp bạn có thêm góc nhìn, góp phần nâng cao hiệu quả tuyển dụng.
        </p>
        <p className="text-gray-600 mb-6">
          Mua dịch vụ ngay để khám phá tính năng ưu việt và cập nhật thông tin tức thì cùng TopCV!
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Mua dịch vụ ngay</Button>
      </div>
    </div>
  )
}
