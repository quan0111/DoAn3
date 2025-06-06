"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MoreHorizontal, Download, Eye, Star } from "lucide-react"

export function CVManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const cvs = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      title: "Frontend Developer",
      email: "nguyenvanan@email.com",
      template: "Modern",
      status: "Công khai",
      views: 245,
      downloads: 12,
      rating: 4.8,
      createdDate: "15/01/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      title: "Marketing Specialist",
      email: "tranthibinh@email.com",
      template: "Professional",
      status: "Riêng tư",
      views: 189,
      downloads: 8,
      rating: 4.5,
      createdDate: "18/01/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      title: "UI/UX Designer",
      email: "levancuong@email.com",
      template: "Creative",
      status: "Công khai",
      views: 567,
      downloads: 23,
      rating: 4.9,
      createdDate: "20/01/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Phạm Thị Dung",
      title: "Data Analyst",
      email: "phamthidung@email.com",
      template: "Minimal",
      status: "Chờ duyệt",
      views: 123,
      downloads: 5,
      rating: 4.2,
      createdDate: "22/01/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Công khai":
        return "bg-green-100 text-green-800"
      case "Riêng tư":
        return "bg-blue-100 text-blue-800"
      case "Chờ duyệt":
        return "bg-yellow-100 text-yellow-800"
      case "Bị khóa":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTemplateColor = (template: string) => {
    switch (template) {
      case "Modern":
        return "bg-purple-100 text-purple-800"
      case "Professional":
        return "bg-blue-100 text-blue-800"
      case "Creative":
        return "bg-orange-100 text-orange-800"
      case "Minimal":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý CV</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">45,231</div>
            <p className="text-sm text-gray-600">Tổng CV</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">38,456</div>
            <p className="text-sm text-gray-600">CV công khai</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">2,134</div>
            <p className="text-sm text-gray-600">Chờ duyệt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">15,432</div>
            <p className="text-sm text-gray-600">CV Premium</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách CV</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm CV..."
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
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Người tạo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Vị trí</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Template</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thống kê</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Đánh giá</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cvs.map((cv) => (
                  <tr key={cv.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={cv.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{cv.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{cv.name}</div>
                          <div className="text-sm text-gray-500">{cv.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{cv.title}</div>
                      <div className="text-sm text-gray-500">Tạo: {cv.createdDate}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getTemplateColor(cv.template)}>{cv.template}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(cv.status)}>{cv.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Eye className="h-3 w-3 text-gray-400" />
                          {cv.views} lượt xem
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Download className="h-3 w-3 text-gray-400" />
                          {cv.downloads} lượt tải
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{cv.rating}</span>
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
