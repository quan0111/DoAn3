"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, ChevronLeft, ChevronRight } from "lucide-react"

const notifications = [
  {
    date: "02/04/2025",
    title:
      "Tăng ngày dịch vụ trong 2 dịp nghỉ lễ: ngày Giỗ tổ Hùng Vương (10/3 âm lịch) và ngày Giải phóng Miền Nam 30/4 & Quốc tế Lao động 01/05",
    isNew: true,
  },
  {
    date: "01/04/2025",
    title: "[TopCV] Thông báo cập nhật Quy chế hoạt động",
    isNew: true,
  },
  {
    date: "03/03/2025",
    title: "[TOPCV] CHƯƠNG TRÌNH 8/3 - TRI ÂN NHỮNG NGƯỜI LÀM TUYỂN DỤNG",
    isNew: true,
  },
  {
    date: "17/02/2025",
    title: "Ra mắt tính năng Toppy AI Duyệt tin tự động",
    isNew: true,
  },
  {
    date: "15/01/2025",
    title: "TopCV cập nhật hệ thống quản lý định kỳ",
    isNew: true,
  },
  {
    date: "24/12/2024",
    title: "Tăng thêm ngày dịch vụ trong 2 dịp nghỉ lễ: Tết Dương lịch 2025 và Tết Âm lịch 2025",
    isNew: true,
  },
  {
    date: "25/11/2024",
    title: "[TOPCV REWARDS] THÔNG BÁO CẬP NHẬT PHÂN LOẠI ĐIỂM TOP POINT",
    isNew: true,
  },
  {
    date: "22/11/2024",
    title: "THÔNG BÁO BẢO TRÌ HỆ THỐNG",
    isNew: true,
  },
  {
    date: "11/10/2024",
    title: "Quy định về cập nhật mật khẩu định kỳ",
    isNew: true,
  },
  {
    date: "27/08/2024",
    title: "Tăng ngày dịch vụ trong dịp nghỉ lễ Quốc khánh 02/09",
    isNew: true,
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Thông báo từ hệ thống</h1>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-yellow-600">Thông báo</span>
                    <span className="text-sm text-gray-500">{notification.date}</span>
                    {notification.isNew && <Badge className="bg-green-500 text-white text-xs">Mới</Badge>}
                  </div>
                  <p className="text-sm text-gray-900">{notification.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-6 pt-6 border-t border-gray-200">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-green-500 text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              4
            </Button>
            <Button variant="outline" size="sm">
              5
            </Button>
            <span className="text-sm text-gray-500">...</span>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
