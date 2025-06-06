"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, Plus, MapPin, Clock, DollarSign } from "lucide-react"

export function JobManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Công ty ABC Tech",
      location: "Hà Nội",
      salary: "15-25 triệu",
      type: "Toàn thời gian",
      status: "Đang tuyển",
      applications: 45,
      postedDate: "20/01/2024",
      expireDate: "20/02/2024",
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Công ty XYZ Corp",
      location: "TP.HCM",
      salary: "20-30 triệu",
      type: "Toàn thời gian",
      status: "Chờ duyệt",
      applications: 23,
      postedDate: "22/01/2024",
      expireDate: "22/02/2024",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Startup DEF",
      location: "Đà Nẵng",
      salary: "12-18 triệu",
      type: "Bán thời gian",
      status: "Đang tuyển",
      applications: 67,
      postedDate: "18/01/2024",
      expireDate: "18/02/2024",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Công ty GHI Ltd",
      location: "Remote",
      salary: "18-25 triệu",
      type: "Remote",
      status: "Hết hạn",
      applications: 89,
      postedDate: "10/01/2024",
      expireDate: "10/02/2024",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang tuyển":
        return "bg-green-100 text-green-800"
      case "Chờ duyệt":
        return "bg-yellow-100 text-yellow-800"
      case "Hết hạn":
        return "bg-red-100 text-red-800"
      case "Tạm dừng":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Toàn thời gian":
        return "bg-blue-100 text-blue-800"
      case "Bán thời gian":
        return "bg-purple-100 text-purple-800"
      case "Remote":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý việc làm</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Thêm việc làm
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">8,432</div>
            <p className="text-sm text-gray-600">Tổng việc làm</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">6,234</div>
            <p className="text-sm text-gray-600">Đang tuyển</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">1,456</div>
            <p className="text-sm text-gray-600">Chờ duyệt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">742</div>
            <p className="text-sm text-gray-600">Hết hạn</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách việc làm</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm việc làm..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Việc làm</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thông tin</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Loại</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Ứng tuyển</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.company}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-3 w-3 text-gray-400" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3 text-gray-400" />
                          Hết hạn: {job.expireDate}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{job.applications}</div>
                        <div className="text-xs text-gray-500">ứng viên</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
