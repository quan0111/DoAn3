"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, MessageSquare, Phone, Mail, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const candidateData = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0901234567",
    position: "Frontend Developer",
    experience: "3 năm",
    location: "Hà Nội",
    education: "Đại học Bách Khoa",
    skills: ["React", "TypeScript", "Node.js", "MongoDB"],
    status: "active",
    lastLogin: "2024-01-15",
    joinDate: "2023-06-10",
    applications: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0901234568",
    position: "UI/UX Designer",
    experience: "2 năm",
    location: "TP.HCM",
    education: "Đại học FPT",
    skills: ["Figma", "Adobe XD", "Photoshop", "Sketch"],
    status: "active",
    lastLogin: "2024-01-14",
    joinDate: "2023-08-15",
    applications: 8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0901234569",
    position: "Backend Developer",
    experience: "5 năm",
    location: "Đà Nẵng",
    education: "Đại học Công nghệ",
    skills: ["Java", "Spring Boot", "MySQL", "Docker"],
    status: "inactive",
    lastLogin: "2024-01-10",
    joinDate: "2022-03-20",
    applications: 25,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function CandidateManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredCandidates = candidateData.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
    const matchesLocation = locationFilter === "all" || candidate.location === locationFilter
    return matchesSearch && matchesStatus && matchesLocation
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý ứng viên</h1>
          <p className="text-gray-600">Quản lý thông tin và hoạt động của ứng viên</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Download className="w-4 h-4 mr-2" />
          Xuất danh sách
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">12,847</div>
            <div className="text-sm text-gray-600">Tổng ứng viên</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">8,392</div>
            <div className="text-sm text-gray-600">Đang hoạt động</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">1,245</div>
            <div className="text-sm text-gray-600">Mới tuần này</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">3,456</div>
            <div className="text-sm text-gray-600">Ứng tuyển tuần này</div>
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
                  placeholder="Tìm kiếm theo tên, email hoặc vị trí..."
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
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Địa điểm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                <SelectItem value="TP.HCM">TP.HCM</SelectItem>
                <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc nâng cao
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ứng viên</TableHead>
                <TableHead>Vị trí mong muốn</TableHead>
                <TableHead>Kinh nghiệm</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Kỹ năng</TableHead>
                <TableHead>Ứng tuyển</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hoạt động cuối</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {candidate.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {candidate.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{candidate.position}</TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {candidate.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{candidate.applications}</div>
                      <div className="text-xs text-gray-500">đơn ứng tuyển</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={candidate.status === "active" ? "default" : "secondary"}>
                      {candidate.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {candidate.lastLogin}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="Xem hồ sơ">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Nhắn tin">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Gọi điện">
                        <Phone className="w-4 h-4" />
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
