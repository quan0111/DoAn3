"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Eye, Edit, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

interface Notification {
  notification_id: string;
  user_id: string | null;
  type:
    | "application_update"
    | "job_recommendation"
    | "payment_confirmation"
    | "system_message"
    | "event_invitation"
    | "profile_update"
    | "message_received"
    | "promotion";
  title: string;
  message: string;
  language_code: string;
  related_entity_type: string;
  related_entity_id: string | null;
  action_url: string | null;
  priority: string;
  status: "sent" | "draft" | "scheduled" | "failed";
  sender_id: string | null;
  scheduled_at: string | null;
  read_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  user_name: string;
  sender_name: string;
  target_group: string; // Thêm trường tùy chọn
  delivery_channels: string[];
}

// Hàm chuẩn hóa URL
const normalizeUrl = (url: string | null) => {
  if (!url) return "Chưa cung cấp";
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};

export function NotificationHistory() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [notification, setNotification] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNoti = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/notificationss"); // Sửa URL API
        setNotification(res.data);
      } catch (error: any) {
        toast.error(
          "Lỗi khi tải danh sách thông báo: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNoti();
  }, []);

  const filteredHistory = notification.filter((notification) => {
    const matchesStatus =
      statusFilter === "all" || notification.status === statusFilter;
    const matchesType =
      typeFilter === "all" || notification.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="default">Đã gửi</Badge>;
      case "draft":
        return <Badge variant="secondary">Nháp</Badge>;
      case "scheduled":
        return <Badge variant="outline">Đã lên lịch</Badge>;
      case "failed":
        return <Badge variant="destructive">Thất bại</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "application_update":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            Cập nhật ứng tuyển
          </Badge>
        );
      case "job_recommendation":
        return (
          <Badge className="bg-green-100 text-green-800">Gợi ý công việc</Badge>
        );
      case "payment_confirmation":
        return (
          <Badge className="bg-purple-100 text-purple-800">
            Xác nhận thanh toán
          </Badge>
        );
      case "system_message":
        return <Badge className="bg-gray-100 text-gray-800">Hệ thống</Badge>;
      case "event_invitation":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Lời mời sự kiện
          </Badge>
        );
      case "profile_update":
        return (
          <Badge className="bg-indigo-100 text-indigo-800">
            Cập nhật hồ sơ
          </Badge>
        );
      case "message_received":
        return <Badge className="bg-pink-100 text-pink-800">Tin nhắn</Badge>;
      case "promotion":
        return (
          <Badge className="bg-orange-100 text-orange-800">Khuyến mãi</Badge>
        );
      default:
        return <Badge className="bg-blue-100 text-blue-800">Thông tin</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Lịch sử thông báo
          </h1>
          <p className="text-gray-600">
            Theo dõi các thông báo đã gửi và hiệu quả
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {notification.filter((n) => n.status === "sent").length}
            </div>
            <div className="text-sm text-gray-600">Đã gửi</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {notification.filter((n) => n.status === "scheduled").length}
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
                <SelectItem value="application_update">
                  Cập nhật ứng tuyển
                </SelectItem>
                <SelectItem value="job_recommendation">
                  Gợi ý công việc
                </SelectItem>
                <SelectItem value="payment_confirmation">
                  Xác nhận thanh toán
                </SelectItem>
                <SelectItem value="system_message">Hệ thống</SelectItem>
                <SelectItem value="event_invitation">
                  Lời mời sự kiện
                </SelectItem>
                <SelectItem value="profile_update">Cập nhật hồ sơ</SelectItem>
                <SelectItem value="message_received">Tin nhắn</SelectItem>
                <SelectItem value="promotion">Khuyến mãi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 text-center">Đang tải...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Đối tượng</TableHead>
                  <TableHead>Thời gian gửi</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Kênh</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((notification) => (
                  <TableRow key={notification.notification_id}>
                    <TableCell className="font-medium">
                      <a
                        href={normalizeUrl(notification.action_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {notification.title}
                      </a>
                    </TableCell>
                    <TableCell>{getTypeBadge(notification.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {{
                            all: "Tất cả",
                            jobseekers: "Ứng viên",
                            employers: "Nhà tuyển dụng",
                            admins: "Quản trị viên",
                            custom: "Tùy chỉnh",
                          }[notification.target_group] || "Không xác định"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {notification.scheduled_at || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(notification.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-center">
                        {notification.delivery_channels?.length > 0 ? (
                          notification.delivery_channels.map(
                            (channel, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {channel === "in_app"
                                  ? "In-App"
                                  : channel === "push"
                                  ? "Push"
                                  : channel === "email"
                                  ? "Email"
                                  : channel === "sms"
                                  ? "SMS"
                                  : channel}
                              </Badge>
                            )
                          )
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            N/A
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {notification.status === "draft" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Chỉnh sửa"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Gửi ngay"
                            >
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
