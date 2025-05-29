"use client"

import { useState } from "react"
import {
  BarChart3,
  Users,
  FileText,
  Target,
  Plus,
  ShoppingCart,
  User,
  TrendingUp,
  Award,
  Zap,
  CheckCircle,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const quickActions = [
  {
    title: "Đăng tin tuyển dụng",
    description: "Tạo tin tuyển dụng mới",
    icon: Plus,
    color: "bg-green-500",
    href: "/job-posts/create",
  },
  {
    title: "Tìm kiếm CV",
    description: "Tìm ứng viên phù hợp",
    icon: Search,
    color: "bg-blue-500",
    href: "/cv-management",
  },
  {
    title: "Mua dịch vụ",
    description: "Nâng cấp tài khoản",
    icon: ShoppingCart,
    color: "bg-purple-500",
    href: "/services",
  },
]

export default function EmployerDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const sidebarItems = [
    { id: "dashboard", label: "Bảng tin", icon: BarChart3 },
    { id: "insights", label: "TopCV Insights", icon: TrendingUp },
    { id: "rewards", label: "TopCV Rewards", icon: Award },
    { id: "partners", label: "Đối quả", icon: Users },
    { id: "toppy-ai", label: "Toppy AI - Đề xuất", icon: Zap, badge: "2" },
    { id: "cv-recommendations", label: "CV đề xuất", icon: FileText },
    { id: "recruitment-campaigns", label: "Chiến dịch tuyển dụng", icon: Target },
    { id: "job-posts", label: "Tin tuyển dụng", icon: FileText },
    { id: "cv-management", label: "Quản lý CV", icon: Users },
    { id: "cv-employee-management", label: "Quản lý nhân CV", icon: Users, badge: "Beta" },
    { id: "recruitment-reports", label: "Báo cáo tuyển dụng", icon: BarChart3 },
    { id: "services", label: "Mua dịch vụ", icon: ShoppingCart },
    { id: "my-services", label: "Dịch vụ của tôi", icon: User },
    { id: "referrals", label: "Mã ưu đãi", icon: Award },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Important Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Thông báo quan trọng</h3>
              <p className="text-sm text-blue-700 mt-1">
                Từ ngày 08/05/2025, TopCV ngừng hỗ trợ tin đăng có bạn (standard) đối với một số nhóm vị trí tuyển dụng
                nhất định (xem chi tiết tại đây)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promotional Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
            <h3 className="text-xl font-bold mb-2">GIỎ QUÀ ĐA TIỆN ÍCH</h3>
            <p className="text-sm opacity-90">SPECIAL SUPPORT | Đồng hành thêm vững bước</p>
            <p className="text-xs opacity-75 mt-2">CHỈ DÀNH CHO KHÁCH HÀNG CÓ HIỆU QUẢ</p>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Cơ hội nhận</h3>
            <h2 className="text-2xl font-bold">VOUCHER 40%</h2>
            <p className="text-sm opacity-90">cho khách hàng mới</p>
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Xin chào, Quân Đào</h3>
              <p className="text-sm text-gray-600">
                Hãy thực hiện các bước sau để gia tăng tính bảo mật cho tài khoản của bạn và nhận ngay
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-500">+8 Top Points</span>
              <p className="text-sm text-gray-600">để Đổi quà khi đăng tin tuyển dụng đầu tiên.</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-medium">25%</span>
            <Progress value={25} className="flex-1" />
            <Button size="sm" className="bg-green-500 hover:bg-green-600">
              +8 Top Points
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="text-xs">📱</span>
              </div>
              <span className="text-sm">Xác thực số điện thoại</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <span className="text-sm">Cập nhật thông tin công ty</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="text-xs">📄</span>
              </div>
              <span className="text-sm">Cập nhật Giấy đăng ký doanh nghiệp</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="text-xs">📝</span>
              </div>
              <span className="text-sm">Đăng tin tuyển dụng đầu tiên</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Khám phá TopCV dành cho nhà tuyển dụng</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <Button className="bg-green-500 hover:bg-green-600 text-white">Thử ngay</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <img
          src="/images/insights-illustration.png"
          alt="TopCV Insights"
          width={400}
          height={300}
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">TopCV Insights</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          TopCV Insights cung cấp những bí kíp, thông tin hữu ích về Xu hướng thị trường tuyển dụng, Hành vi tìm việc
          của ứng viên,... giúp bạn có thêm góc nhìn, góp phần nâng cao hiệu quả tuyển dụng.
        </p>
        <p className="text-gray-600 mb-6">
          Mua dịch vụ ngay để khám phá tính năng ưu việt và cập nhật thông tin tức thì cùng TopCV!
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Mua dịch vụ ngay</Button>
      </div>
    </div>
  )

  const renderCVRecommendations = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <img
          src="/images/cv-recommendations.png"
          alt="CV Recommendations"
          width={400}
          height={300}
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold mb-4">CV đề xuất</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Vui lòng kích hoạt dịch vụ Top Max Plus, Top Max, Top Pro, Top Eco Plus, Top Active, Top Boost, Top Hire hoặc
          Standard Extra để sử dụng tính năng CV đề xuất.
        </p>
        <p className="text-gray-600 mb-6">
          Tính năng sẽ được kích hoạt trong thời gian chạy Top Max Plus, Top Max, Top Pro, Top Eco Plus, Top Active, Top
          Boost, Top Hire hoặc Standard Extra.
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Kích hoạt dịch vụ</Button>
      </div>
    </div>
  )

  const renderRecruitmentCampaigns = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src="/images/recruitment-campaign.png"
            alt="Recruitment Campaign"
            width={500}
            height={400}
            className="w-full"
          />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tạo chiến dịch tuyển dụng của bạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tên chiến dịch tuyển dụng *</label>
                  <Input placeholder="VD: Tuyển dụng nhân viên Marketing tháng 10..." />
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Tiếp theo →</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold">💡 Tại liệu bạn nên xem</h3>
            <p className="text-sm text-gray-600">
              Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu tốt hơn hoạt động tuyển dụng của doanh
              nghiệp trên TopCV. Hãy chắc chắn bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng.
            </p>
            <div className="space-y-2">
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Smart Recruitment Platform Principle →
              </Button>
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Khái niệm Chiến dịch tuyển dụng →
              </Button>
              <Button variant="link" className="text-green-500 p-0 h-auto">
                Khởi tạo Chiến dịch tuyển dụng đúng cách →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCVManagement = () => (
    <div className="space-y-6">
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

  const renderAIScreening = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Sàng lọc hồ sơ tự động bằng Toppy AI</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src="/images/ai-screening.png"
            alt="AI Screening Process"
            width={500}
            height={400}
            className="w-full"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              Sàng lọc hồ sơ tự động, tiết kiệm thời gian sơ tuyển, gia tăng cơ hội tiếp cận ứng viên tiềm năng bằng
              cách <span className="font-semibold">gắn nhãn cho CV</span>. Bạn có thể tạo các nhãn tùy chỉnh theo như
              cầu hoặc để Toppy AI gợi ý cho bạn các tiêu chí phù hợp dựa trên tin tuyển dụng.
            </p>
            <p className="text-sm text-green-800 mt-2">
              Khi có CV ứng tuyển, Toppy AI sẽ giúp bạn{" "}
              <span className="font-semibold">
                đọc toàn bộ hồ sơ và tự động gắn nhãn cho những CV đáp ứng các tiêu chí đã cài đặt
              </span>
              . Tính năng hiện đang được thử nghiệm, đánh giá cho các{" "}
              <span className="font-semibold">khách hàng thân thiết</span> từ hàng Bạc trở lên hoặc chạy ít nhất 1 dịch
              vụ Top Job.
            </p>
            <Button variant="link" className="text-green-600 p-0 mt-2">
              Tìm hiểu thêm →
            </Button>
          </div>

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Mua dịch vụ 🛒</Button>
        </div>
      </div>
    </div>
  )

  const renderServices = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-600">TOP MAX TRIAL</CardTitle>
            <div className="text-2xl font-bold">2.887.500 VND*</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Trải nghiệm đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong Việc làm tốt nhất kết hợp cùng các dịch
              vụ cao cấp, gia dụng thú hấp dẫn.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                🛒 Thêm vào giỏ
              </Button>
              <Button className="w-full bg-green-500 hover:bg-green-600">Mua ngay</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-600">TOP PRO TRIAL</CardTitle>
            <div className="text-2xl font-bold">2.448.000 VND*</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Trải nghiệm đăng tin tuyển dụng tối ưu với vị trí ưu tiên trong Việc làm hấp dẫn kết hợp cùng các dịch vụ
              cao cấp và được bảo hành với nhiều quyền lợi ưu tiên.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                🛒 Thêm vào giỏ
              </Button>
              <Button className="w-full bg-green-500 hover:bg-green-600">Mua ngay</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-600">TOP ECO PLUS TRIAL</CardTitle>
            <div className="text-2xl font-bold">2.112.000 VND*</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Trải nghiệm đăng tin tuyển dụng tiết kiệm với vị trí hiển thị trong Đề xuất việc làm liên quan kết hợp
              cùng các dịch vụ khác, gia dụng thú hấp dẫn.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                🛒 Thêm vào giỏ
              </Button>
              <Button className="w-full bg-green-500 hover:bg-green-600">Mua ngay</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">TOP JOBS | ĐĂNG TIN TUYỂN DỤNG HIỆU SUẤT CAO</h3>
        <p className="text-gray-600 mb-6">
          Công hướng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Doanh nghiệp
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 relative">
          <div className="absolute -top-2 right-4">
            <Badge className="bg-yellow-500 text-white">VIP</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-green-600">TOP MAX PLUS</CardTitle>
            <div className="text-2xl font-bold">9.650.000 VND*</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong Việc làm tốt nhất, x2 lượt đẩy Top, được sử dụng
              tính năng CV đề xuất kết hợp các dịch vụ cao cấp và được bảo hành với nhiều quyền lợi ưu tiên.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                🛒 Thêm vào giỏ
              </Button>
              <Button className="w-full bg-green-500 hover:bg-green-600">Mua ngay</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 relative">
          <div className="absolute -top-2 right-4">
            <Badge className="bg-yellow-500 text-white">VIP</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-green-600">TOP MAX</CardTitle>
            <div className="text-2xl font-bold">7.500.000 VND*</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong Việc làm tốt nhất, được sử dụng tính năng CV đề xuất
              kết hợp các dịch vụ cao cấp và được bảo hành với nhiều quyền lợi ưu tiên.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                🛒 Thêm vào giỏ
              </Button>
              <Button className="w-full bg-green-500 hover:bg-green-600">Mua ngay</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-600">TOP PRO</CardTitle>
            <div className="text-2xl font-bold">5.440.000 VND*</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Đăng tin tuyển dụng tối ưu với vị trí ưu tiên trong Việc làm hấp dẫn, được sử dụng tính năng CV đề xuất
              kết hợp các dịch vụ cao cấp và được bảo hành.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                🛒 Thêm vào giỏ
              </Button>
              <Button className="w-full bg-green-500 hover:bg-green-600">Mua ngay</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "insights":
        return renderInsights()
      case "cv-recommendations":
        return renderCVRecommendations()
      case "recruitment-campaigns":
        return renderRecruitmentCampaigns()
      case "cv-management":
        return renderCVManagement()
      case "toppy-ai":
        return renderAIScreening()
      case "services":
        return renderServices()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold">topcv</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              🔍 HR Insider
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              👤 Đăng tin
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              📄 Tìm CV
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              🔗 Connect
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              📊 Insights
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              🔔
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              🛒 0
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              👤
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                Q
              </div>
              <div>
                <div className="font-semibold">Quân Đào</div>
                <div className="text-sm text-gray-500">Employer</div>
                <div className="text-xs text-green-600">Tài khoản xác thực: Cấp 1/3</div>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-green-50 text-green-600 border-r-2 border-green-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 space-y-3">
        <Button className="bg-slate-800 hover:bg-slate-700 text-white rounded-full p-3">
          Tiếp theo: Xác thực số điện thoại →
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 p-0">
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
