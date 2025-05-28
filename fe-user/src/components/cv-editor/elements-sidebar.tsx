"use client"

import { PlusCircle } from "lucide-react"
import type { CVElement } from "@/lib/types"

interface ElementsSidebarProps {
  onAddElement: (element: CVElement) => void
}

export function ElementsSidebar({ onAddElement }: ElementsSidebarProps) {
  const elementTypes = [
    {
      type: "heading",
      label: "Tiêu đề",
      defaultContent: "Tiêu đề mới",
    },
    {
      type: "text",
      label: "Văn bản",
      defaultContent: "Nhập nội dung của bạn ở đây...",
    },
    {
      type: "skills",
      label: "Kỹ năng",
      defaultContent: "HTML, CSS, JavaScript, React",
    },
    {
      type: "experience",
      label: "Kinh nghiệm",
      defaultContent: "Mô tả kinh nghiệm của bạn",
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-gray-500 mb-2">
        Kéo các thành phần vào CV của bạn
      </h3>
      {elementTypes.map((element) => (
        <button
          key={element.type}
          onClick={() =>
            onAddElement({
              id: `element-${Date.now()}`,
              type: element.type,
              content: element.defaultContent,
              position: {
                x: 0,
                y: 0,
                width: 100,
                height: 50,
              },
            })
          }
          className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-md border text-left"
        >
          <span>{element.label}</span>
          <PlusCircle className="h-5 w-5 text-emerald-500" />
        </button>
      ))}
    </div>
  )
}
