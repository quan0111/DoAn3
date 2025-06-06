"use client"

import { Link } from "react-router-dom"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  FileText,
  Target,
  ShoppingCart,
  User,
  TrendingUp,
  Award,
  Zap,
  Package,
  Clock,
  Settings,
  Bell,
  HelpCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

const sidebarItems = [
  { href: "/", label: "Bảng tin", icon: BarChart3 },
  { href: "/insights", label: "TopCV Insights", icon: TrendingUp },
  { href: "/rewards", label: "TopCV Rewards", icon: Award },
  { href: "/partners", label: "Đối quả", icon: Users },
  { href: "/toppy-ai", label: "Toppy AI - Đề xuất", icon: Zap, badge: "2" },
  { href: "/cv-recommendations", label: "CV đề xuất", icon: FileText },
  { href: "/recruitment-campaigns", label: "Chiến dịch tuyển dụng", icon: Target },
  { href: "/job-posts", label: "Tin tuyển dụng", icon: FileText },
  { href: "/cv-management", label: "Quản lý CV", icon: Users },
  { href: "/cv-employee-management", label: "Quản lý nhân CV", icon: Users, badge: "Beta" },
  { href: "/reports", label: "Báo cáo tuyển dụng", icon: BarChart3 },
  { href: "/services", label: "Mua dịch vụ", icon: ShoppingCart },
  { href: "/my-services", label: "Dịch vụ của tôi", icon: User },
  { href: "/referrals", label: "Mã ưu đãi", icon: Award },
  { href: "/order-tracking", label: "Theo dõi đơn hàng", icon: Package },
  { href: "/activity-history", label: "Lịch sử hoạt động", icon: Clock },
  { href: "/account-settings", label: "Cài đặt tài khoản", icon: Settings },
  { href: "/notifications", label: "Thông báo hệ thống", icon: Bell, badge: "57" },
  { href: "/support", label: "Hỗ trợ hỗ trợ", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
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
            <Link
              key={item.href}
              to={item.href}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href
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
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
