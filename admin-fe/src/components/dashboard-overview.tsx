"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, FileText, TrendingUp, Eye } from "lucide-react"
import { RecentJobsTable } from "./recent-job"
export function DashboardOverview() {
  const stats = [
    {
      title: "Tổng người dùng",
      value: "125,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Việc làm đang tuyển",
      value: "8,432",
      change: "+8%",
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      title: "CV được tạo",
      value: "45,231",
      change: "+15%",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Lượt xem hôm nay",
      value: "12,847",
      change: "+5%",
      icon: Eye,
      color: "text-orange-600",
    },
  ]

  const recentActivities = [
    { action: "Người dùng mới đăng ký", user: "Nguyễn Văn A", time: "5 phút trước" },
    { action: "Công ty đăng tin tuyển dụng", user: "Công ty ABC", time: "10 phút trước" },
    { action: "CV được tải xuống", user: "Trần Thị B", time: "15 phút trước" },
    { action: "Ứng tuyển mới", user: "Lê Văn C", time: "20 phút trước" },
    { action: "Công ty xác minh", user: "Công ty XYZ", time: "25 phút trước" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} so với tháng trước
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tỷ lệ ứng tuyển thành công</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Công ty đã xác minh</span>
                <span className="font-semibold">892</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CV premium được tạo</span>
                <span className="font-semibold">15,432</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Đánh giá trung bình</span>
                <span className="font-semibold">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <RecentJobsTable></RecentJobsTable>
          </CardContent>
        </Card>
    </div>
  )
}
