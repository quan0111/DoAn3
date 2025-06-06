"use client"
import { CheckCircle, Plus, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { FloatingAction } from "@/components/layout/floating-action"

const quickActions = [
  {
    title: "Đăng tin tuyển dụng",
    description: "Tạo tin tuyển dụng mới",
    icon: Plus,
    color: "bg-green-500",
    href: "/job-posts/create",
  },
  {
    title: "Tìm kiếm CV",
    description: "Tìm ứng viên phù hợp",
    icon: Search,
    color: "bg-blue-500",
    href: "/cv-management",
  },
  {
    title: "Mua dịch vụ",
    description: "Nâng cấp tài khoản",
    icon: ShoppingCart,
    color: "bg-purple-500",
    href: "/services",
  },
]

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Important Notice */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Thông báo quan trọng</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Từ ngày 08/05/2025, TopCV ngừng hỗ trợ tin đăng có bạn (standard) đối với một số nhóm vị trí tuyển
                      dụng nhất định (xem chi tiết tại đây)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promotional Banners */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">GIỎ QUÀ ĐA TIỆN ÍCH</h3>
                  <p className="text-sm opacity-90">SPECIAL SUPPORT | Đồng hành thêm vững bước</p>
                  <p className="text-xs opacity-75 mt-2">CHỈ DÀNH CHO KHÁCH HÀNG CÓ HIỆU QUẢ</p>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Cơ hội nhận</h3>
                  <h2 className="text-2xl font-bold">VOUCHER 40%</h2>
                  <p className="text-sm opacity-90">cho khách hàng mới</p>
                </div>
              </Card>
            </div>

            {/* Progress Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Xin chào, Quân Đào</h3>
                    <p className="text-sm text-gray-600">
                      Hãy thực hiện các bước sau để gia tăng tính bảo mật cho tài khoản của bạn và nhận ngay
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-500">+8 Top Points</span>
                    <p className="text-sm text-gray-600">để Đổi quà khi đăng tin tuyển dụng đầu tiên.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-medium">25%</span>
                  <Progress value={25} className="flex-1" />
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    +8 Top Points
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-xs">📱</span>
                    </div>
                    <span className="text-sm">Xác thực số điện thoại</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <span className="text-sm">Cập nhật thông tin công ty</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-xs">📄</span>
                    </div>
                    <span className="text-sm">Cập nhật Giấy đăng ký doanh nghiệp</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-xs">📝</span>
                    </div>
                    <span className="text-sm">Đăng tin tuyển dụng đầu tiên</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Khám phá TopCV dành cho nhà tuyển dụng</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`w-16 h-16 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                      >
                        <action.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">Thử ngay</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <FloatingAction />
    </div>
  )
}
