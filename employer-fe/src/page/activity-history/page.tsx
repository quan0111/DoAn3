"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, CreditCard, FileText, Settings, User, Search, BarChart3 } from "lucide-react"

const historyCategories = [
  { id: "all", label: "Tất cả lịch sử", icon: Clock },
  { id: "service", label: "Lịch sử kích hoạt dịch vụ", icon: Settings },
  { id: "tp", label: "Lịch sử TP", icon: BarChart3 },
  { id: "cp", label: "Lịch sử CP", icon: CreditCard },
  { id: "op", label: "Lịch sử OP", icon: FileText },
  { id: "sp", label: "Lịch sử cập nhật SP", icon: User },
  { id: "account", label: "Lịch sử cập nhật tài khoản", icon: User },
  { id: "cv-search", label: "Báo cáo CV tìm kiếm", icon: Search },
  { id: "cv-recommend", label: "Báo cáo CV đề xuất", icon: FileText },
]

const activityHistory = [
  {
    date: "29/05/2025",
    time: "10:06",
    action: "Đăng nhập",
    type: "login",
  },
  {
    date: "28/05/2025",
    time: "23:38",
    action: "Đăng xuất",
    type: "logout",
  },
  {
    date: "28/05/2025",
    time: "23:38",
    action: "Đăng xuất",
    type: "logout",
  },
  {
    date: "28/05/2025",
    time: "23:31",
    action: "Đăng nhập",
    type: "login",
  },
  {
    date: "28/05/2025",
    time: "23:31",
    action: "Đăng ký tài khoản thành công",
    type: "register",
  },
]

export default function ActivityHistoryPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lịch sử hoạt động</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {historyCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeCategory === category.id ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="text-sm">{category.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Tất cả lịch sử</h2>
                <div className="text-sm text-gray-500">29/04/2025 - 29/05/2025</div>
              </div>

              <div className="space-y-4">
                {activityHistory.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="text-sm font-medium text-gray-900 w-24">{activity.date}</div>
                    <div className="text-sm text-blue-600 w-16">{activity.time}</div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-700">{activity.action}</span>
                    </div>
                  </div>
                ))}
              </div>

              {activityHistory.length === 0 && (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Không có hoạt động nào trong khoảng thời gian này</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
