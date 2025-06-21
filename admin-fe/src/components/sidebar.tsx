"use client"

import { Calendar1,LogOut  ,LayoutDashboard, Users, Briefcase, FileText, BarChart3, Settings, Building2, Building, Bell, TrendingUp, Send, Package,MessageSquareMore,ArrowRightLeft   } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "candicate", label: "Quản lý ứng viên", icon: Users },
    { id: "employer", label: "Quản lý công ty", icon: Building},
    { id: "report", label: "báo cáo", icon: TrendingUp},
    { id: "nofication", label: "Hệ thống thông báo", icon: Bell},
    { id: "sendnoti", label: "Gửi thông báo", icon: Send},
    { id: "feedback", label: "Phản hồi người dùng", icon: MessageSquareMore },
    { id: "transaction", label: "lịch sử giao dịch", icon: ArrowRightLeft },
    { id: "recentjob", label: "công việc gần đây", icon: Send},
    { id: "notihistory", label: "Lịch sử thông báo", icon: Bell},
    { id:"service", label: "Quản lý dịch vụ",icon: Package },
    { id: "jobs", label: "Quản lý việc làm", icon: Briefcase },
    { id: "cvs", label: "Quản lý CV", icon: FileText },
    { id: "analytics", label: "Thống kê", icon: BarChart3 },
    { id: "event", label: "sự kiện", icon: Calendar1 },
    { id: "settings", label: "Cài đặt", icon: Settings },
    { id: "logout", label: "Đăng xuất", icon: LogOut  },

  ]

  return (
    <div className="bg-white w-64 shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">TopCV Admin</h1>
        </div>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start px-6 py-3 text-left ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
