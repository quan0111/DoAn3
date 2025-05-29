"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lock, User, FileText, Building, Link, Settings, CheckCircle, ArrowRight } from "lucide-react"

const settingsCategories = [
  { id: "password", label: "Đổi mật khẩu", icon: Lock },
  { id: "personal", label: "Thông tin cá nhân", icon: User },
  { id: "business", label: "Giấy đăng ký doanh nghiệp", icon: FileText },
  { id: "company", label: "Thông tin công ty", icon: Building },
  { id: "api", label: "Kết nối API", icon: Link },
  { id: "settings", label: "Cài đặt", icon: Settings },
]

const verificationSteps = [
  { id: "phone", label: "Xác thực số điện thoại", completed: false },
  { id: "company", label: "Cập nhật thông tin công ty", completed: true },
  { id: "business", label: "Xác thực Giấy đăng ký doanh nghiệp", completed: false },
]

export default function AccountSettingsPage() {
  const [activeCategory, setActiveCategory] = useState("personal")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {settingsCategories.map((category) => (
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
            <CardContent className="p-6">
              {/* Account Verification Status */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Tài khoản xác thực: Cấp 1/3</h2>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Hoàn thành 33%
                  </Badge>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <p className="text-sm text-orange-800">
                      Nâng cấp tài khoản lên <span className="font-semibold">cấp 2/3</span> để nhận{" "}
                      <span className="font-semibold">100 lượt xem CV ứng viên từ cộng cụ tìm kiếm CV</span>.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">Vui lòng thực hiện các bước xác thực dưới đây:</p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Xác thực thông tin</h3>
                    <Progress value={33} className="mb-4" />
                  </div>

                  {verificationSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                        <span className={`text-sm ${step.completed ? "text-green-600" : "text-gray-700"}`}>
                          {step.label}
                        </span>
                      </div>
                      {!step.completed && (
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">Tìm hiểu thêm</Button>
              </div>

              {/* Personal Information Form */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Cập nhật thông tin cá nhân</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Avatar</label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                        <Button variant="outline" size="sm">
                          Đổi avatar
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Họ và tên</label>
                      <Input defaultValue="Quân Đào" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                      <div className="flex space-x-2">
                        <Input defaultValue="09761288342" className="flex-1" />
                        <Button variant="outline" size="sm" className="text-green-600">
                          Cập nhật
                        </Button>
                        <Button variant="outline" size="sm" className="text-green-600">
                          Xác thực
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email: daoquan356@gmail.com</label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Giới tính</label>
                      <Input defaultValue="Nam" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
