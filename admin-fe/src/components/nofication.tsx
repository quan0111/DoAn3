"use client"

import { useState } from "react"
import { Bell, Check, X, AlertCircle, Info, CheckCircle, XCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notifications = [
  {
    id: "1",
    type: "info",
    title: "CV mới được đăng ký",
    message: "Nguyễn Văn A vừa đăng ký CV cho vị trí Frontend Developer",
    time: "2 phút trước",
    read: false,
    priority: "normal",
  },
  {
    id: "2",
    type: "warning",
    title: "Tin tuyển dụng cần duyệt",
    message: "Công ty ABC đã đăng tin tuyển dụng Backend Developer cần được phê duyệt",
    time: "15 phút trước",
    read: false,
    priority: "high",
  },
  {
    id: "3",
    type: "success",
    title: "Thanh toán thành công",
    message: "Công ty XYZ đã thanh toán gói Premium thành công",
    time: "1 giờ trước",
    read: true,
    priority: "normal",
  },
  {
    id: "4",
    type: "error",
    title: "Lỗi hệ thống",
    message: "Có lỗi xảy ra trong quá trình xử lý email thông báo",
    time: "2 giờ trước",
    read: false,
    priority: "critical",
  },
  {
    id: "5",
    type: "info",
    title: "Báo cáo tuần",
    message: "Báo cáo thống kê tuần này đã sẵn sàng để xem",
    time: "1 ngày trước",
    read: true,
    priority: "low",
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case "warning":
      return <AlertCircle className="w-5 h-5 text-yellow-500" />
    case "error":
      return <XCircle className="w-5 h-5 text-red-500" />
    default:
      return <Info className="w-5 h-5 text-blue-500" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-100 border-red-200"
    case "high":
      return "bg-orange-100 border-orange-200"
    case "low":
      return "bg-gray-100 border-gray-200"
    default:
      return "bg-blue-100 border-blue-200"
  }
}

export function NotificationCenter() {
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedTab === "unread") return !notification.read
    if (selectedTab === "read") return notification.read
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hệ thống thông báo</h1>
          <p className="text-gray-600">Quản lý và theo dõi các thông báo hệ thống</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bell className="w-4 h-4" />
            {unreadCount} chưa đọc
          </Badge>
          <Button variant="outline">Đánh dấu tất cả đã đọc</Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Gửi thông báo mới
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
            <div className="text-sm text-gray-600">Tổng thông báo</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Chưa đọc</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {notifications.filter((n) => n.priority === "critical").length}
            </div>
            <div className="text-sm text-gray-600">Ưu tiên cao</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{notifications.filter((n) => n.read).length}</div>
            <div className="text-sm text-gray-600">Đã xử lý</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách thông báo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="unread">Chưa đọc ({unreadCount})</TabsTrigger>
              <TabsTrigger value="read">Đã đọc</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${getPriorityColor(notification.priority)} ${
                      !notification.read ? "border-l-4 border-l-orange-500" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">
                                Mới
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                notification.priority === "critical"
                                  ? "border-red-500 text-red-700"
                                  : notification.priority === "high"
                                    ? "border-orange-500 text-orange-700"
                                    : notification.priority === "low"
                                      ? "border-gray-500 text-gray-700"
                                      : "border-blue-500 text-blue-700"
                              }`}
                            >
                              {notification.priority === "critical"
                                ? "Khẩn cấp"
                                : notification.priority === "high"
                                  ? "Cao"
                                  : notification.priority === "low"
                                    ? "Thấp"
                                    : "Bình thường"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button variant="ghost" size="icon">
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
