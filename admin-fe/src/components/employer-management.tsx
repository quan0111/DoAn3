"use client"

import { useState } from "react"
import { Search, Building2, Users, Briefcase, Star, Eye, Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const employerData = [
  {
    id: "1",
    name: "FPT Software",
    industry: "Công nghệ thông tin",
    size: "1000+ nhân viên",
    location: "Hà Nội, TP.HCM",
    activeJobs: 25,
    totalApplications: 1250,
    rating: 4.5,
    status: "verified",
    joinDate: "2020-01-15",
    contact: "hr@fpt.com.vn",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "VNG Corporation",
    industry: "Game & Entertainment",
    size: "500-1000 nhân viên",
    location: "TP.HCM",
    activeJobs: 18,
    totalApplications: 890,
    rating: 4.7,
    status: "verified",
    joinDate: "2019-03-20",
    contact: "careers@vng.com.vn",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Tiki Corporation",
    industry: "E-commerce",
    size: "200-500 nhân viên",
    location: "TP.HCM",
    activeJobs: 12,
    totalApplications: 456,
    rating: 4.3,
    status: "pending",
    joinDate: "2021-06-10",
    contact: "hr@tiki.vn",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export function EmployerManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredEmployers = employerData.filter((employer) => {
    const matchesSearch =
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || employer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý nhà tuyển dụng</h1>
          <p className="text-gray-600">Quản lý các công ty và nhà tuyển dụng trên nền tảng</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Thêm nhà tuyển dụng
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-sm text-gray-600">Tổng nhà tuyển dụng</div>
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
                <div className="text-2xl font-bold text-gray-900">892</div>
                <div className="text-sm text-gray-600">Đã xác thực</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2,847</div>
                <div className="text-sm text-gray-600">Tổng tin tuyển dụng</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4.4</div>
                <div className="text-sm text-gray-600">Đánh giá trung bình</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc và tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tên công ty hoặc ngành nghề..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="verified">Đã xác thực</SelectItem>
                <SelectItem value="pending">Chờ xác thực</SelectItem>
                <SelectItem value="suspended">Tạm khóa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employer Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Công ty</TableHead>
                <TableHead>Ngành nghề</TableHead>
                <TableHead>Quy mô</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Tin tuyển dụng</TableHead>
                <TableHead>Ứng tuyển</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployers.map((employer) => (
                <TableRow key={employer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employer.logo || "/placeholder.svg"} alt={employer.name} />
                        <AvatarFallback>{employer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employer.name}</div>
                        <div className="text-sm text-gray-500">{employer.contact}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employer.industry}</TableCell>
                  <TableCell>{employer.size}</TableCell>
                  <TableCell>{employer.location}</TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{employer.activeJobs}</div>
                      <div className="text-xs text-gray-500">đang tuyển</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium text-green-600">{employer.totalApplications}</div>
                      <div className="text-xs text-gray-500">ứng tuyển</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{employer.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employer.status === "verified"
                          ? "default"
                          : employer.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {employer.status === "verified"
                        ? "Đã xác thực"
                        : employer.status === "pending"
                          ? "Chờ xác thực"
                          : "Tạm khóa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
