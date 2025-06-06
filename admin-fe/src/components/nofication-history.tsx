"use client"

import { useState } from "react"
import { Calendar, Users, Eye, Edit, Trash2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const notificationHistory = [
  {
    id: "1",
    title: "Bảo trì hệ thống định kỳ",
    type: "warning",
    priority: "high",
    recipients: "all",
    recipientCount: 15094,
    sentAt: "2024-01-15 14:30",
    status: "sent",
    openRate: "78%",
    clickRate: "12%",
    channels: ["push", "email"],
  },
  {
    id: "2",
    title: "Chào mừng ứng viên mới",
    type: "success",
    priority: "normal",
    recipients: "candidates",
    recipientCount: 245,
    sentAt: "2024-01-15 09:00",
    status: "sent",
    openRate: "92%",
    clickRate: "34%",
    channels: ["push", "email"],
  },
  {
    id: "3",
    title: "Cập nhật tính năng mới",
    type: "info",
    priority: "normal",
    recipients: "employers",
    recipientCount: 1247,
    sentAt: "2024-01-14 16:45",
    status: "sent",
    openRate: "65%",
    clickRate: "18%",
    channels: ["push", "email", "sms"],
  },
  {
    id: "4",
    title: "Thông báo bảo mật quan trọng",
    type: "error",
    priority: "critical",
    recipients: "all",
    recipientCount: 15094,
    sentAt: "2024-01-13 10:15",
    status: "sent",
    openRate: "95%",
    clickRate: "67%",
    channels: ["push", "email", "sms"],
  },
  {
    id: "5",
    title: "Khuyến mãi gói Premium",
    type: "info",
    priority: "low",
    recipients: "employers",
    recipientCount: 856,
    sentAt: "2024-01-12 11:00",
    status: "draft",
    openRate: "-",
    clickRate: "-",
    channels: ["email"],
  },
]

export function NotificationHistory() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredHistory = notificationHistory.filter((notification) => {
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    return matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="default">Đã gửi</Badge>
      case "draft":
        return <Badge variant="secondary">Nháp</Badge>
      case "scheduled":
        return <Badge variant="outline">Đã lên lịch</Badge>
      case "failed":
        return <Badge variant="destructive">Thất bại</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Thành công</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Cảnh báo</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Lỗi</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800">Thông tin</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lịch sử thông báo</h1>
          <p className="text-gray-600">Theo dõi các thông báo đã gửi và hiệu quả</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {notificationHistory.filter((n) => n.status === "sent").length}
            </div>
            <div className="text-sm text-gray-600">Đã gửi</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {notificationHistory.filter((n) => n.status === "scheduled").length}
            </div>
            <div className="text-sm text-gray-600">Đã lên lịch</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">82%</div>
            <div className="text-sm text-gray-600">Tỷ lệ mở trung bình</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">28%</div>
            <div className="text-sm text-gray-600">Tỷ lệ click trung bình</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="sent">Đã gửi</SelectItem>
                <SelectItem value="draft">Nháp</SelectItem>
                <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Loại thông báo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="info">Thông tin</SelectItem>
                <SelectItem value="success">Thành công</SelectItem>
                <SelectItem value="warning">Cảnh báo</SelectItem>
                <SelectItem value="error">Lỗi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Đối tượng</TableHead>
                <TableHead>Thời gian gửi</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Tỷ lệ mở</TableHead>
                <TableHead>Tỷ lệ click</TableHead>
                <TableHead>Kênh</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">{notification.title}</TableCell>
                  <TableCell>{getTypeBadge(notification.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {notification.recipients === "all"
                          ? "Tất cả"
                          : notification.recipients === "candidates"
                            ? "Ứng viên"
                            : "NTD"}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {notification.recipientCount.toLocaleString()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {notification.sentAt}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(notification.status)}</TableCell>
                  <TableCell>
                    <span className={notification.openRate === "-" ? "text-gray-400" : "text-green-600 font-medium"}>
                      {notification.openRate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={notification.clickRate === "-" ? "text-gray-400" : "text-blue-600 font-medium"}>
                      {notification.clickRate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {notification.channels.map((channel, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {channel === "push" ? "Push" : channel === "email" ? "Email" : "SMS"}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="Xem chi tiết">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {notification.status === "draft" && (
                        <>
                          <Button variant="ghost" size="icon" title="Chỉnh sửa">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Gửi ngay">
                            <Send className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" title="Xóa">
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
