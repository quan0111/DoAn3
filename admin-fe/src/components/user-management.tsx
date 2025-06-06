"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MoreHorizontal, UserPlus, Mail, Phone } from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "nguyenvanan@email.com",
      phone: "0123456789",
      type: "Ứng viên",
      status: "Hoạt động",
      joinDate: "15/01/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Công ty ABC Tech",
      email: "hr@abctech.com",
      phone: "0987654321",
      type: "Nhà tuyển dụng",
      status: "Đã xác minh",
      joinDate: "10/01/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Trần Thị Bình",
      email: "tranthibinh@email.com",
      phone: "0111222333",
      type: "Ứng viên",
      status: "Hoạt động",
      joinDate: "20/01/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Công ty XYZ Corp",
      email: "contact@xyzcorp.com",
      phone: "0444555666",
      type: "Nhà tuyển dụng",
      status: "Chờ xác minh",
      joinDate: "25/01/2024",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoạt động":
      case "Đã xác minh":
        return "bg-green-100 text-green-800"
      case "Chờ xác minh":
        return "bg-yellow-100 text-yellow-800"
      case "Tạm khóa":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    return type === "Ứng viên" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách người dùng</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm người dùng..."
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
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Người dùng</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Liên hệ</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Loại</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Ngày tham gia</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-gray-400" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getTypeColor(user.type)}>{user.type}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{user.joinDate}</td>
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
