import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const trialServices = [
  {
    name: "TOP MAX TRIAL",
    price: "2.887.500 VND*",
    description:
      "Trải nghiệm đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong Việc làm tốt nhất kết hợp cùng các dịch vụ cao cấp, gia dụng thú hấp dẫn.",
    color: "border-orange-200",
    titleColor: "text-orange-600",
  },
  {
    name: "TOP PRO TRIAL",
    price: "2.448.000 VND*",
    description:
      "Trải nghiệm đăng tin tuyển dụng tối ưu với vị trí ưu tiên trong Việc làm hấp dẫn kết hợp cùng các dịch vụ cao cấp và được bảo hành với nhiều quyền lợi ưu tiên.",
    color: "border-blue-200",
    titleColor: "text-blue-600",
  },
  {
    name: "TOP ECO PLUS TRIAL",
    price: "2.112.000 VND*",
    description:
      "Trải nghiệm đăng tin tuyển dụng tiết kiệm với vị trí hiển thị trong Đề xuất việc làm liên quan kết hợp cùng các dịch vụ khác, gia dụng thú hấp dẫn.",
    color: "border-green-200",
    titleColor: "text-green-600",
  },
]

const premiumServices = [
  {
    name: "TOP MAX PLUS",
    price: "9.650.000 VND*",
    description:
      "Đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong Việc làm tốt nhất, x2 lượt đẩy Top, được sử dụng tính năng CV đề xuất kết hợp các dịch vụ cao cấp và được bảo hành với nhiều quyền lợi ưu tiên.",
    color: "border-green-200",
    titleColor: "text-green-600",
    badge: "VIP",
  },
  {
    name: "TOP MAX",
    price: "7.500.000 VND*",
    description:
      "Đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong Việc làm tốt nhất, được sử dụng tính năng CV đề xuất kết hợp các dịch vụ cao cấp và được bảo hành với nhiều quyền lợi ưu tiên.",
    color: "border-green-200",
    titleColor: "text-green-600",
    badge: "VIP",
  },
  {
    name: "TOP PRO",
    price: "5.440.000 VND*",
    description:
      "Đăng tin tuyển dụng tối ưu với vị trí ưu tiên trong Việc làm hấp dẫn, được sử dụng tính năng CV đề xuất kết hợp các dịch vụ cao cấp và được bảo hành.",
    color: "border-blue-200",
    titleColor: "text-blue-600",
  },
]

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mua dịch vụ</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {trialServices.map((service, index) => (
          <Card key={index} className={service.color}>
            <CardHeader>
              <CardTitle className={service.titleColor}>{service.name}</CardTitle>
              <div className="text-2xl font-bold">{service.price}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  🛒 Thêm vào giỏ
                </Button>
                <Button className="w-full bg-green-500 hover:bg-green-600">Mua ngay</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">TOP JOBS | ĐĂNG TIN TUYỂN DỤNG HIỆU SUẤT CAO</h3>
        <p className="text-gray-600 mb-6">
          Công hướng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {premiumServices.map((service, index) => (
          <Card key={index} className={`${service.color} relative`}>
            {service.badge && (
              <div className="absolute -top-2 right-4">
                <Badge className="bg-yellow-500 text-white">{service.badge}</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className={service.titleColor}>{service.name}</CardTitle>
              <div className="text-2xl font-bold">{service.price}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  🛒 Thêm vào giỏ
                </Button>
                <Button className="w-full bg-green-500 hover:bg-green-600">Mua ngay</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
