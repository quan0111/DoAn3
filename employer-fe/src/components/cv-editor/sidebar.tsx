"use client"
import { Paintbrush, Plus, LayoutGrid, FileText, MessageSquare, Library } from "lucide-react"
import type { ActivePanel } from "@/lib/types"

interface SidebarProps {
  activePanel: ActivePanel | null
  setActivePanel: (panel: ActivePanel | null) => void
}

export function Sidebar({ activePanel, setActivePanel }: SidebarProps) {
  const menuItems = [
    {
      id: "design",
      label: "Thiết kế & Font",
      icon: <Paintbrush className="h-5 w-5" />,
    },
    {
      id: "add-section",
      label: "Thêm mục",
      icon: <Plus className="h-5 w-5" />,
    },
    {
      id: "layout",
      label: "Bố cục",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      id: "template",
      label: "Đổi mẫu CV",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "suggestions",
      label: "Gợi ý viết CV",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "library",
      label: "Thư viện CV",
      icon: <Library className="h-5 w-5" />,
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActivePanel(item.id as ActivePanel)}
              className={`w-full flex items-center px-4 py-3 text-left ${
                activePanel === item.id
                  ? "bg-emerald-50 text-emerald-600 border-l-4 border-emerald-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className={`mr-3 ${activePanel === item.id ? "text-emerald-600" : "text-gray-500"}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
