"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

const orderTabs = [
  { id: "all", label: "Tất cả", count: 0 },
  { id: "pending", label: "Đang chờ duyệt", count: 0 },
  { id: "running", label: "Đang chạy dịch vụ", count: 0 },
  { id: "completed", label: "Hoàn thành", count: 0 },
  { id: "expired", label: "Hết hạn", count: 0 },
  { id: "cancelled", label: "Bị hủy", count: 0 },
]

export default function OrderTrackingPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Theo dõi đơn hàng</h1>

      {/* Warning Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <p className="text-sm text-yellow-800">
                Hệ thống sẽ tự động hủy các đơn hàng không được thanh toán trước ngày 31/05/2025. Vui lòng thanh toán để
                đơn hàng không bị hủy.{" "}
                <Button variant="link" className="text-green-600 p-0 h-auto underline">
                  Tìm hiểu thêm
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {orderTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              <Badge variant="secondary" className="ml-2">
                {tab.count}
              </Badge>
            </button>
          ))}
        </nav>
      </div>

      {/* Empty State */}
      <div className="text-center py-16">
        <div className="w-32 h-32 mx-auto mb-6">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Illustration of people working with documents */}
            <rect x="50" y="100" width="300" height="150" rx="10" fill="#e5f7e5" />
            <rect x="80" y="130" width="80" height="8" rx="4" fill="#22c55e" />
            <rect x="180" y="130" width="80" height="8" rx="4" fill="#22c55e" />
            <rect x="280" y="130" width="60" height="8" rx="4" fill="#22c55e" />
            <rect x="80" y="150" width="60" height="8" rx="4" fill="#22c55e" />
            <rect x="160" y="150" width="100" height="8" rx="4" fill="#22c55e" />
            <rect x="80" y="170" width="90" height="8" rx="4" fill="#22c55e" />
            <rect x="190" y="170" width="70" height="8" rx="4" fill="#22c55e" />
            <rect x="80" y="190" width="120" height="8" rx="4" fill="#22c55e" />
            <rect x="220" y="190" width="80" height="8" rx="4" fill="#22c55e" />

            {/* People illustrations */}
            <circle cx="120" cy="80" r="15" fill="#22c55e" />
            <rect x="110" y="95" width="20" height="30" rx="10" fill="#22c55e" />
            <circle cx="280" cy="80" r="15" fill="#3b82f6" />
            <rect x="270" y="95" width="20" height="30" rx="10" fill="#3b82f6" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Bạn chưa có đơn hàng nào</h3>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Mua dịch vụ
        </Button>
      </div>
    </div>
  )
}
