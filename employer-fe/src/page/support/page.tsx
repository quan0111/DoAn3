"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, FileText, Phone, Upload } from "lucide-react"

const supportCategories = [
  { id: "support", label: "Yêu cầu hỗ trợ & Báo cáo vi phạm", icon: HelpCircle },
  { id: "feedback", label: "Góp ý sản phẩm", icon: MessageSquare },
  { id: "consultation", label: "Tư vấn tuyển dụng", icon: FileText },
  { id: "hotline", label: "Hotline CSKH & Hỗ trợ dịch vụ", icon: Phone },
  { id: "guide", label: "Tài liệu hướng dẫn", icon: FileText },
]

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState("support")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hỗ trợ hỗ trợ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeCategory === category.id ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="text-sm">{category.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-green-500" />
                <span>Yêu cầu hỗ trợ & Báo cáo vi phạm</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Yêu cầu hỗ trợ & Báo cáo vi phạm</h3>
                <p className="text-sm text-green-700">
                  Với mong muốn tiếp nhận và xử lý các phản hồi từ phía nhà tuyển dụng một cách nhanh chóng, TopCV cho
                  ra mắt <span className="font-semibold">Hộp thư hỗ trợ</span> để lắng nghe tất cả các phản hồi từ phía
                  Nhà tuyển dụng/ Doanh nghiệp về trải nghiệm khi sử dụng hệ thống. Những phản hồi chính xác của anh/
                  chị là cơ sở để TopCV cải tiến và nâng cao chất lượng sản phẩm.
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="Nhập tiêu đề" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Loại báo cáo <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại báo cáo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Lỗi kỹ thuật</SelectItem>
                      <SelectItem value="account">Vấn đề tài khoản</SelectItem>
                      <SelectItem value="service">Dịch vụ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mô tả <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="Nhập mô tả" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tài liệu chứng minh</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Kéo tệp của bạn vào đây hoặc bấm để tải lên</p>
                    <p className="text-xs text-gray-500 mb-4">
                      Cho phép upload tối đa 2 file và dung lượng mỗi file không vượt quá 5MB.
                    </p>
                    <p className="text-xs text-gray-400">( Hỗ trợ tải lên file: GIF, JPEG, JPG, PNG, BMP, PDF )</p>
                  </div>
                </div>

                <Button className="bg-green-500 hover:bg-green-600 text-white">Gửi báo cáo</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
