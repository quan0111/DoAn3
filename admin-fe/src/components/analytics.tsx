"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Users, Briefcase, FileText, Eye, BarChart3 } from "lucide-react"

export function Analytics() {
  const metrics = [
    {
      title: "Người dùng mới",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Việc làm mới",
      value: "456",
      change: "+8.2%",
      trend: "up",
      icon: Briefcase,
    },
    {
      title: "CV được tạo",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: FileText,
    },
    {
      title: "Lượt xem trang",
      value: "89,432",
      change: "-2.1%",
      trend: "down",
      icon: Eye,
    },
  ]

  const topCompanies = [
    { name: "Công ty ABC Tech", jobs: 45, applications: 1234 },
    { name: "Công ty XYZ Corp", jobs: 38, applications: 987 },
    { name: "Startup DEF", jobs: 29, applications: 756 },
    { name: "Công ty GHI Ltd", jobs: 22, applications: 543 },
    { name: "Company JKL", jobs: 18, applications: 432 },
  ]

  const topSkills = [
    { skill: "JavaScript", count: 2847 },
    { skill: "React", count: 2156 },
    { skill: "Node.js", count: 1923 },
    { skill: "Python", count: 1756 },
    { skill: "Java", count: 1543 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Thống kê & Phân tích</h1>
        <Button variant="outline">Xuất báo cáo</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
          const trendColor = metric.trend === "up" ? "text-green-600" : "text-red-600"

          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <Icon className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs flex items-center mt-1 ${trendColor}`}>
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {metric.change} so với tháng trước
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top công ty tuyển dụng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{company.name}</div>
                    <div className="text-sm text-gray-500">{company.jobs} việc làm</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{company.applications}</div>
                    <div className="text-sm text-gray-500">ứng tuyển</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kỹ năng được tìm kiếm nhiều nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSkills.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="font-medium">{item.skill}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(item.count / 3000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ tăng trưởng người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-2" />
              <p>Biểu đồ sẽ được hiển thị ở đây</p>
              <p className="text-sm">Tích hợp với thư viện biểu đồ như Chart.js hoặc Recharts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
