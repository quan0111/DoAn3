import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CVManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý CV ứng viên</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-4">
          <Input placeholder="Tìm kiếm tên, email, số điện thoại" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chọn chiến dịch tuyển dụng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả chiến dịch</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Nhập trạng thái CV" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Nhập nguồn CV" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả nguồn</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tất cả nhân" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tất cả thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả thời gian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="lg:w-2/3">
          <Card className="border-green-200 bg-green-50 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    Đồng bộ hồ sơ ứng viên từ các website tuyển dụng, gửi email tự động, đặt lịch phỏng vấn, lập báo cáo
                    hiệu quả tuyển dụng với <span className="font-semibold text-green-600">SHiring.ai</span>
                  </p>
                </div>
                <Button variant="outline" className="border-green-500 text-green-600">
                  Đăng ký ngay →
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">Tìm thấy 0 ứng viên</p>
            <p className="text-gray-500">Bạn không có CV</p>
          </div>
        </div>
      </div>
    </div>
  )
}
