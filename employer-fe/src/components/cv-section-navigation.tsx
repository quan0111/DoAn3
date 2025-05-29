import { Link } from "react-router-dom"
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  BarChart,
  Heart,
  Globe,
  FileText,
  Smartphone,
} from "lucide-react"

export function CVSectionNavigation() {
  // Mảng các mục điều hướng cho CV
  const navItems = [
    {
      title: "Thông tin cá nhân",
      icon: <User className="h-5 w-5" />,
      active: true,
    },
    {
      title: "Kinh nghiệm làm việc",
      icon: <Briefcase className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Học vấn",
      icon: <GraduationCap className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Chứng chỉ",
      icon: <Award className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Kỹ năng",
      icon: <BarChart className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Ngôn ngữ",
      icon: <Languages className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Sở thích",
      icon: <Heart className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Hoạt động xã hội",
      icon: <Globe className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Dự án",
      icon: <FileText className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Thông tin bổ sung",
      icon: <Smartphone className="h-5 w-5" />,
      active: false,
    },
  ]

  // Indikator tiến trình
  const progress = {
    current: 2,
    total: 5,
    percent: 40,
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-medium">Các mục CV</h2>
        <div className="mt-2">
          <div className="mb-1 flex justify-between">
            <span className="text-xs font-medium">
              Bước {progress.current}/{progress.total}
            </span>
            <span className="text-xs text-gray-500">{progress.percent}% hoàn thành</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-green-600" style={{ width: `${progress.percent}%` }}></div>
          </div>
        </div>
      </div>

      <div className="p-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to="/"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  item.active ? "bg-green-50 font-medium text-green-600" : "hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    item.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
