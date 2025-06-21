"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

interface Partner {
  id: number
  name: string
  description: string
  type: string
  benefits: string
  image?: string
  joinedDate: string
}

export default function PartnersPage() {
  const [partners] = useState<Partner[]>([
    {
      id: 1,
      name: "FPT Corporation",
      description: "Một trong những tập đoàn công nghệ hàng đầu tại Việt Nam, cung cấp giải pháp CNTT toàn diện.",
      type: "Công nghệ",
      benefits: "Truy cập vào đội ngũ kỹ sư chất lượng cao và ưu đãi tuyển dụng đặc biệt.",
      image: "public/FPT.png",
      joinedDate: "2024-12-01",
    },
    {
      id: 2,
      name: "VinGroup",
      description: "Tập đoàn đa ngành với các lĩnh vực như bất động sản, y tế, và giáo dục, hợp tác để tuyển dụng nhân sự chất lượng.",
      type: "Đa ngành",
      benefits: "Ưu đãi đào tạo và hỗ trợ tuyển dụng nhân sự cấp cao.",
      image: "public/Vingroup_logo.svg.png",
      joinedDate: "2025-01-15",
    },
    {
      id: 3,
      name: "Viettel Solutions",
      description: "Đơn vị cung cấp giải pháp số hóa cho doanh nghiệp, hợp tác để tìm kiếm nhân tài CNTT.",
      type: "Công nghệ",
      benefits: "Hỗ trợ quảng bá thương hiệu và giảm phí đăng tuyển.",
      image: "/public/viettel.png",
      joinedDate: "2025-02-10",
    },
    {
      id: 4,
      name: "Suntory PepsiCo Vietnam",
      description: "Công ty hàng đầu trong ngành thực phẩm và đồ uống, hợp tác để tuyển dụng nhân sự bán hàng và marketing.",
      type: "Thực phẩm & Đồ uống",
      benefits: "Chương trình khuyến mãi độc quyền và cơ hội hợp tác dài hạn.",
      image: "/public/pepsico.png",
      joinedDate: "2025-03-20",
    },
    {
      id: 5,
      name: "Techcombank",
      description: "Ngân hàng thương mại hàng đầu, hợp tác để tuyển dụng nhân sự tài chính và công nghệ.",
      type: "Tài chính",
      benefits: "Ưu đãi lãi suất và hỗ trợ tài chính cho đối tác tuyển dụng.",
      image: "public/techcombank.png",
      joinedDate: "2025-04-05",
    },
    {
      id: 6,
      name: "Unilever Vietnam",
      description: "Công ty đa quốc gia trong ngành hàng tiêu dùng, hợp tác để tìm kiếm nhân tài marketing.",
      type: "Hàng tiêu dùng",
      benefits: "Cơ hội tham gia sự kiện quốc tế và ưu đãi sản phẩm.",
      image: "public/unilever.jpg",
      joinedDate: "2025-05-12",
    },
    {
      id: 7,
      name: "Masan Group",
      description: "Tập đoàn kinh tế đa ngành, hợp tác để tuyển dụng nhân sự bán lẻ và sản xuất.",
      type: "Bán lẻ & Sản xuất",
      benefits: "Hỗ trợ quảng bá sản phẩm và giảm phí dịch vụ TopCV.",
      image: "public/Masan.jpg",
      joinedDate: "2025-06-01",
    },
    {
      id: 8,
      name: "PwC Vietnam",
      description: "Công ty kiểm toán và tư vấn hàng đầu, hợp tác để tuyển dụng chuyên gia tài chính.",
      type: "Kiểm toán & Tư vấn",
      benefits: "Đào tạo chuyên sâu và ưu đãi tuyển dụng nhân sự cấp cao.",
      image: "public/pwc-logo.png",
      joinedDate: "2025-06-10",
    },
  ])

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Đối tác</h1>

      <div className="text-center py-8">
        <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-16 h-16 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Chương trình đối tác</h3>
        <p className="text-gray-500 mb-4 max-w-xl mx-auto">
          Kết nối và hợp tác cùng TopCV để mở rộng cơ hội tuyển dụng và phát triển doanh nghiệp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <img
                src={partner.image || "public/partner-default.jpg"}
                alt={partner.name}
                className="w-full h-40 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-2 text-gray-800">{partner.name}</CardTitle>
              <p className="text-gray-600 mb-2">{partner.description}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Loại:</strong> {partner.type}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Lợi ích:</strong> {partner.benefits}</p>
              <p className="text-xs text-gray-500 mt-2">Tham gia: {partner.joinedDate}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
          Tìm hiểu thêm
        </Button>
      </div>
    </div>
  )
}