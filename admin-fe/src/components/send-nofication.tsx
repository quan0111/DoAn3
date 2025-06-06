"use client";

import type React from "react";

import { useState } from "react";
import {
  Send,
  Users,
  Building2,
  User,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NotificationForm {
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  priority: "low" | "normal" | "high" | "critical";
  recipients: "all" | "candidates" | "employers" | "specific";
  specificUsers: string[];
  scheduledTime?: string;
  sendEmail: boolean;
  sendSMS: boolean;
  sendPush: boolean;
}

const userGroups = [
  { id: "all", label: "Tất cả người dùng", count: 15094, icon: Users },
  { id: "candidates", label: "Ứng viên", count: 12847, icon: User },
  { id: "employers", label: "Nhà tuyển dụng", count: 1247, icon: Building2 },
];

const specificUsers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    type: "candidate",
  },
  { id: "2", name: "FPT Software", email: "hr@fpt.com.vn", type: "employer" },
  {
    id: "3",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    type: "candidate",
  },
  {
    id: "4",
    name: "VNG Corporation",
    email: "careers@vng.com.vn",
    type: "employer",
  },
];

export function SendNotification() {
  const [form, setForm] = useState<NotificationForm>({
    title: "",
    message: "",
    type: "info",
    priority: "normal",
    recipients: "all",
    specificUsers: [],
    sendEmail: true,
    sendSMS: false,
    sendPush: true,
  });

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending notification:", form);
    // Implement send notification logic here
    alert("Thông báo đã được gửi thành công!");
  };

  const handleUserSelect = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-red-500 bg-red-50";
      case "high":
        return "border-orange-500 bg-orange-50";
      case "low":
        return "border-gray-500 bg-gray-50";
      default:
        return "border-blue-500 bg-blue-50";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gửi thông báo</h1>
          <p className="text-gray-600">Tạo và gửi thông báo đến người dùng</p>
        </div>
        <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? "Chỉnh sửa" : "Xem trước"}
        </Button>
      </div>

      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList>
          <TabsTrigger value="compose">Soạn thông báo</TabsTrigger>
          <TabsTrigger value="templates">Mẫu có sẵn</TabsTrigger>
          <TabsTrigger value="scheduled">Thông báo đã lên lịch</TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          {previewMode ? (
            <Card>
              <CardHeader>
                <CardTitle>Xem trước thông báo</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`p-4 rounded-lg border-2 ${getPriorityColor(
                    form.priority
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    {getTypeIcon(form.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">
                          {form.title || "Tiêu đề thông báo"}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {form.priority === "critical"
                            ? "Khẩn cấp"
                            : form.priority === "high"
                            ? "Cao"
                            : form.priority === "low"
                            ? "Thấp"
                            : "Bình thường"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {form.message ||
                          "Nội dung thông báo sẽ hiển thị ở đây..."}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">Vừa xong</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium mb-2">Thông tin gửi:</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      • Đối tượng:{" "}
                      {form.recipients === "all"
                        ? "Tất cả người dùng"
                        : form.recipients === "candidates"
                        ? "Ứng viên"
                        : form.recipients === "employers"
                        ? "Nhà tuyển dụng"
                        : `${selectedUsers.length} người dùng được chọn`}
                    </p>
                    <p>
                      • Kênh gửi:{" "}
                      {[
                        form.sendPush && "Thông báo đẩy",
                        form.sendEmail && "Email",
                        form.sendSMS && "SMS",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nội dung thông báo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title">Tiêu đề *</Label>
                        <Input
                          id="title"
                          value={form.title}
                          onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                          }
                          placeholder="Nhập tiêu đề thông báo..."
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Nội dung *</Label>
                        <Textarea
                          id="message"
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                          placeholder="Nhập nội dung thông báo..."
                          rows={4}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Loại thông báo</Label>
                          <Select
                            value={form.type}
                            onValueChange={(value: any) =>
                              setForm({ ...form, type: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="info">Thông tin</SelectItem>
                              <SelectItem value="success">
                                Thành công
                              </SelectItem>
                              <SelectItem value="warning">Cảnh báo</SelectItem>
                              <SelectItem value="error">Lỗi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Mức độ ưu tiên</Label>
                          <Select
                            value={form.priority}
                            onValueChange={(value: any) =>
                              setForm({ ...form, priority: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Thấp</SelectItem>
                              <SelectItem value="normal">
                                Bình thường
                              </SelectItem>
                              <SelectItem value="high">Cao</SelectItem>
                              <SelectItem value="critical">Khẩn cấp</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Đối tượng nhận</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={form.recipients}
                        onValueChange={(value: any) =>
                          setForm({ ...form, recipients: value })
                        }
                        className="space-y-3"
                      >
                        {userGroups.map((group) => (
                          <div
                            key={group.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={group.id} id={group.id} />
                            <Label
                              htmlFor={group.id}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <group.icon className="w-4 h-4" />
                              {group.label}
                              <Badge variant="secondary">
                                {group.count.toLocaleString()}
                              </Badge>
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="specific" id="specific" />
                          <Label htmlFor="specific" className="cursor-pointer">
                            Chọn người dùng cụ thể
                          </Label>
                        </div>
                      </RadioGroup>

                      {form.recipients === "specific" && (
                        <div className="mt-4 p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <Label>
                              Chọn người dùng ({selectedUsers.length})
                            </Label>
                            <Button variant="outline" size="sm">
                              <Plus className="w-4 h-4 mr-1" />
                              Thêm từ file
                            </Button>
                          </div>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {specificUsers.map((user) => (
                              <div
                                key={user.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={user.id}
                                  checked={selectedUsers.includes(user.id)}
                                  onCheckedChange={(checked) =>
                                    handleUserSelect(
                                      user.id,
                                      checked as boolean
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={user.id}
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{user.name}</span>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {user.type === "candidate"
                                        ? "Ứng viên"
                                        : "NTD"}
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {user.email}
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Settings Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Kênh gửi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendPush"
                          checked={form.sendPush}
                          onCheckedChange={(checked) =>
                            setForm({ ...form, sendPush: checked as boolean })
                          }
                        />
                        <Label htmlFor="sendPush">Thông báo đẩy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendEmail"
                          checked={form.sendEmail}
                          onCheckedChange={(checked) =>
                            setForm({ ...form, sendEmail: checked as boolean })
                          }
                        />
                        <Label htmlFor="sendEmail">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendSMS"
                          checked={form.sendSMS}
                          onCheckedChange={(checked) =>
                            setForm({ ...form, sendSMS: checked as boolean })
                          }
                        />
                        <Label htmlFor="sendSMS">SMS</Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Lên lịch gửi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="scheduleNow" defaultChecked />
                        <Label htmlFor="scheduleNow">Gửi ngay</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="scheduleLater" />
                        <Label htmlFor="scheduleLater">Lên lịch gửi</Label>
                      </div>
                      <Input
                        type="datetime-local"
                        value={form.scheduledTime}
                        onChange={(e) =>
                          setForm({ ...form, scheduledTime: e.target.value })
                        }
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Gửi thông báo
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                      Lưu nháp
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Mẫu thông báo có sẵn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Chào mừng ứng viên mới",
                    description:
                      "Thông báo chào mừng khi ứng viên đăng ký tài khoản",
                    type: "success",
                    category: "Ứng viên",
                  },
                  {
                    title: "Tin tuyển dụng mới",
                    description: "Thông báo về tin tuyển dụng phù hợp",
                    type: "info",
                    category: "Ứng viên",
                  },
                  {
                    title: "Bảo trì hệ thống",
                    description: "Thông báo bảo trì hệ thống định kỳ",
                    type: "warning",
                    category: "Hệ thống",
                  },
                  {
                    title: "Cập nhật chính sách",
                    description: "Thông báo cập nhật điều khoản sử dụng",
                    type: "info",
                    category: "Chính sách",
                  },
                ].map((template, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{template.title}</h4>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {template.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Sử dụng mẫu này
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Thông báo đã lên lịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Bảo trì hệ thống cuối tuần",
                    scheduledTime: "2024-01-20 02:00",
                    recipients: "Tất cả người dùng",
                    status: "pending",
                  },
                  {
                    title: "Thông báo cập nhật tính năng mới",
                    scheduledTime: "2024-01-22 09:00",
                    recipients: "Ứng viên",
                    status: "pending",
                  },
                ].map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600">
                        Gửi lúc: {notification.scheduledTime} • Đối tượng:{" "}
                        {notification.recipients}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Đang chờ</Badge>
                      <Button variant="outline" size="sm">
                        Chỉnh sửa
                      </Button>
                      <Button variant="outline" size="sm">
                        Hủy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
