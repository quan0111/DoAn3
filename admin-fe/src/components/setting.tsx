"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">Lưu thay đổi</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin website</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Tên website</Label>
              <Input id="site-name" defaultValue="TopCV" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Mô tả website</Label>
              <Textarea
                id="site-description"
                defaultValue="Nền tảng tuyển dụng và tìm việc hàng đầu Việt Nam"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email liên hệ</Label>
              <Input id="contact-email" defaultValue="admin@topcv.vn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-phone">Số điện thoại hỗ trợ</Label>
              <Input id="support-phone" defaultValue="1900-1234" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cài đặt tính năng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép đăng ký mới</Label>
                <p className="text-sm text-gray-500">Người dùng có thể tạo tài khoản mới</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Xác minh email bắt buộc</Label>
                <p className="text-sm text-gray-500">Yêu cầu xác minh email khi đăng ký</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Duyệt việc làm tự động</Label>
                <p className="text-sm text-gray-500">Tự động duyệt việc làm từ công ty đã xác minh</p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo email</Label>
                <p className="text-sm text-gray-500">Gửi thông báo qua email cho người dùng</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cài đặt bảo mật</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Thời gian hết phiên (phút)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-login-attempts">Số lần đăng nhập tối đa</Label>
              <Input id="max-login-attempts" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-min-length">Độ dài mật khẩu tối thiểu</Label>
              <Input id="password-min-length" type="number" defaultValue="8" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bắt buộc xác thực 2 bước</Label>
                <p className="text-sm text-gray-500">Yêu cầu 2FA cho admin</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cài đặt thanh toán</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Đơn vị tiền tệ</Label>
              <Input id="currency" defaultValue="VND" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="premium-price">Giá gói Premium (tháng)</Label>
              <Input id="premium-price" defaultValue="199000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-posting-fee">Phí đăng tin tuyển dụng</Label>
              <Input id="job-posting-fee" defaultValue="500000" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép thanh toán online</Label>
                <p className="text-sm text-gray-500">Tích hợp cổng thanh toán</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sao lưu & Khôi phục</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline">Sao lưu dữ liệu</Button>
            <Button variant="outline">Khôi phục từ sao lưu</Button>
            <Button variant="outline">Xuất dữ liệu</Button>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Lưu ý:</strong> Sao lưu dữ liệu thường xuyên để đảm bảo an toàn. Sao lưu gần nhất: 25/01/2024 -
              14:30
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
