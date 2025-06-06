"use client"

import { useState } from "react"
import { Download, Calendar, TrendingUp, Users, Briefcase, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatsChart } from "./charts/stats-chart"

export function ReportsPage() {
  const [reportType, setReportType] = useState("overview")
  const [timeRange, setTimeRange] = useState("month")

  const handleExportReport = (format: string) => {
    console.log(`Exporting ${reportType} report as ${format}`)
    // Implement export logic here
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo và thống kê</h1>
          <p className="text-gray-600">Phân tích dữ liệu và tạo báo cáo chi tiết</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleExportReport("pdf")}>
            <Download className="w-4 h-4 mr-2" />
            Xuất PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport("excel")}>
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc báo cáo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Loại báo cáo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Tổng quan</SelectItem>
                <SelectItem value="jobs">Công việc</SelectItem>
                <SelectItem value="candidates">Ứng viên</SelectItem>
                <SelectItem value="employers">Nhà tuyển dụng</SelectItem>
                <SelectItem value="revenue">Doanh thu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">7 ngày qua</SelectItem>
                <SelectItem value="month">30 ngày qua</SelectItem>
                <SelectItem value="quarter">3 tháng qua</SelectItem>
                <SelectItem value="year">12 tháng qua</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Chọn ngày tùy chỉnh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2,847</div>
                <div className="text-sm text-gray-600">Tổng công việc</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5% so với tháng trước
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12,847</div>
                <div className="text-sm text-gray-600">Ứng viên hoạt động</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.2% so với tháng trước
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">18,392</div>
                <div className="text-sm text-gray-600">CV đã đăng ký</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15.3% so với tháng trước
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₫2.4B</div>
                <div className="text-sm text-gray-600">Doanh thu tháng</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +22.1% so với tháng trước
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsChart />

        <Card>
          <CardHeader>
            <CardTitle>Top ngành nghề</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Công nghệ thông tin", jobs: 1250, percentage: 45 },
                { name: "Kinh doanh", jobs: 680, percentage: 24 },
                { name: "Marketing", jobs: 420, percentage: 15 },
                { name: "Thiết kế", jobs: 280, percentage: 10 },
                { name: "Khác", jobs: 217, percentage: 6 },
              ].map((industry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{industry.name}</span>
                      <span className="text-sm text-gray-500">{industry.jobs} việc</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${industry.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Báo cáo chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Tỷ lệ ứng tuyển thành công</h4>
                <div className="text-2xl font-bold text-green-600">68.5%</div>
                <div className="text-sm text-gray-500">+5.2% so với tháng trước</div>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium mb-2">Thời gian tuyển dụng trung bình</h4>
                <div className="text-2xl font-bold text-blue-600">18 ngày</div>
                <div className="text-sm text-gray-500">-2 ngày so với tháng trước</div>
              </Card>
              <Card className="p-4">
                <h4 className="font-medium mb-2">Mức lương trung bình</h4>
                <div className="text-2xl font-bold text-purple-600">₫22M</div>
                <div className="text-sm text-gray-500">+8.5% so với tháng trước</div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
