"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Search, Filter, Eye, Edit, MoreHorizontal, Calendar, MapPin, DollarSign } from "lucide-react"

const jobPosts = [
  {
    id: 1,
    title: "Frontend Developer (React/Vue.js)",
    category: "Công nghệ thông tin",
    location: "Hà Nội",
    salary: "15-25 triệu VND",
    status: "Đang tuyển",
    applications: 45,
    views: 1250,
    deadline: "2025-06-15",
    createdAt: "2025-05-20",
    isHot: true,
    isUrgent: false,
  },
  {
    id: 2,
    title: "Marketing Manager",
    category: "Marketing/PR",
    location: "TP. Hồ Chí Minh",
    salary: "20-30 triệu VND",
    status: "Tạm dừng",
    applications: 23,
    views: 890,
    deadline: "2025-06-10",
    createdAt: "2025-05-18",
    isHot: false,
    isUrgent: true,
  },
  {
    id: 3,
    title: "Senior Backend Developer",
    category: "Công nghệ thông tin",
    location: "Đà Nẵng",
    salary: "25-40 triệu VND",
    status: "Đang tuyển",
    applications: 67,
    views: 2100,
    deadline: "2025-06-20",
    createdAt: "2025-05-15",
    isHot: true,
    isUrgent: false,
  },
]

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "active", label: "Đang tuyển" },
  { value: "paused", label: "Tạm dừng" },
  { value: "expired", label: "Hết hạn" },
  { value: "completed", label: "Hoàn thành" },
]

export default function JobPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang tuyển":
        return <Badge className="bg-green-500 text-white">Đang tuyển</Badge>
      case "Tạm dừng":
        return <Badge className="bg-yellow-500 text-white">Tạm dừng</Badge>
      case "Hết hạn":
        return <Badge className="bg-red-500 text-white">Hết hạn</Badge>
      case "Hoàn thành":
        return <Badge className="bg-blue-500 text-white">Hoàn thành</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý tin tuyển dụng</h1>
        <Link to="/job-posts/create">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Đăng tin mới
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tiêu đề, vị trí..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Posts List */}
      <div className="space-y-4">
        {jobPosts.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    {job.isHot && <Badge className="bg-red-500 text-white text-xs">HOT</Badge>}
                    {job.isUrgent && <Badge className="bg-orange-500 text-white text-xs">GẤP</Badge>}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{job.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Hạn: {new Date(job.deadline).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(job.status)}
                    <span className="text-sm text-gray-600">
                      {job.applications} ứng viên • {job.views} lượt xem
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jobPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Chưa có tin tuyển dụng nào</h3>
          <p className="text-gray-500 mb-4">Bắt đầu tạo tin tuyển dụng đầu tiên của bạn</p>
          <Link to="/job-posts/create">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tạo tin tuyển dụng
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
