"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const couponTabs = [
  { id: "active", label: "Có hiệu lực" },
  { id: "used", label: "Đã sử dụng" },
]

const activeCoupons = [
  {
    type: "TOP MAX PLUS",
    discount: "Giảm 30%",
    code: "TMP30",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-orange-500",
  },
  {
    type: "TOP MAX PLUS",
    discount: "Giảm 30%",
    code: "TMP30",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-orange-500",
  },
  {
    type: "TOP MAX PLUS",
    discount: "Giảm 30%",
    code: "TMP30",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-orange-500",
  },
  {
    type: "TOP MAX",
    discount: "Giảm 30%",
    code: "TM30",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-orange-600",
  },
  {
    type: "TOP MAX",
    discount: "Giảm 30%",
    code: "TM30",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-orange-600",
  },
  {
    type: "TOP MAX",
    discount: "Giảm 30%",
    code: "TM30",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-orange-600",
  },
  {
    type: "TOP PRO",
    discount: "Giảm 25%",
    code: "TP25",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-blue-500",
  },
  {
    type: "TOP PRO",
    discount: "Giảm 25%",
    code: "TP25",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-blue-500",
  },
  {
    type: "TOP PRO",
    discount: "Giảm 25%",
    code: "TP25",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-blue-500",
  },
  {
    type: "TOP ECO PLUS",
    discount: "Giảm 20%",
    code: "TE20",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-red-500",
  },
  {
    type: "TOP ECO PLUS",
    discount: "Giảm 20%",
    code: "TE20",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-red-500",
  },
  {
    type: "TOP ECO PLUS",
    discount: "Giảm 20%",
    code: "TE20",
    timeLeft: "Thời gian còn lại: 2 ngày : 13 giờ : 27 phút",
    color: "bg-red-500",
  },
]

export default function ReferralsPage() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mã ưu đãi</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {couponTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Coupons Grid */}
      {activeTab === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCoupons.map((coupon, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className={`absolute left-0 top-0 bottom-0 w-16 ${coupon.color} flex items-center justify-center`}>
                <div className="text-white text-xs font-bold transform -rotate-90 whitespace-nowrap">{coupon.type}</div>
              </div>
              <CardContent className="pl-20 pr-4 py-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{coupon.discount}</h3>
                    <p className="text-sm text-gray-600">{coupon.timeLeft}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono">
                      {coupon.code}
                    </Badge>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Dùng ngay
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "used" && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Chưa có mã ưu đãi đã sử dụng</h3>
          <p className="text-gray-500">Các mã ưu đãi đã sử dụng sẽ hiển thị tại đây</p>
        </div>
      )}
    </div>
  )
}
