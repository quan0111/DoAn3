"use client"

import { X } from "lucide-react"
import type { CVSection } from "@/lib/types"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import { useState } from "react"

interface AddSectionPanelProps {
  onAddSection: (section: CVSection) => void
  onClose: () => void
}

export function AddSectionPanel({ onAddSection, onClose }: AddSectionPanelProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: (event) => {
        return {
          x: 0,
          y: 0,
        }
      },
    }),
  )

  const sectionTypes = [
    {
      id: "profile-picture",
      title: "Ảnh đại diện",
      icon: "user",
      content: "",
    },
    {
      id: "contact-info",
      title: "Danh thiếp",
      icon: "contact",
      content: "",
    },
    {
      id: "personal-info",
      title: "Thông tin cá nhân",
      icon: "info",
      content: "",
    },
    {
      id: "career-objective",
      title: "Mục tiêu nghề nghiệp",
      icon: "target",
      content:
        "Với 6 năm trong nghề lập trình, triển khai trực tiếp hơn 30 dự án, tôi mong muốn ứng tuyển vào vị trí Senio của Công ty để có thể áp dụng những kiến thức, kinh nghiệm lập trình của bản thân để nâng cấp sản phẩm và mang lại những giá trị hữu ích cho doanh nghiệp. Đồng thời, mục tiêu phát triển trong vòng 2 năm tới của tôi sẽ trở thành một Lead giỏi.",
    },
    {
      id: "work-experience",
      title: "Kinh nghiệm làm việc",
      icon: "briefcase",
      content: `<div class="mb-4">
        <div class="flex justify-between mb-1">
          <div class="font-semibold">FRONT END DEVELOPER</div>
          <div>2021 - 2024</div>
        </div>
        <div class="text-gray-700 mb-1">Công ty XYZ TopCV</div>
        <ul class="list-disc pl-5 space-y-1">
          <li>Quản lý các dự án phát triển trang web từ thiết kế ban đầu cho đến hoàn thiện, tối ưu hóa tất cả khả năng tương thích trên nhiều trình duyệt và đa nền tảng.</li>
          <li>Tham gia đánh giá và thử nghiệm các tính năng mới để đảm bảo web tương thích với các tính năng hiện có.</li>
          <li>Hợp tác chặt chẽ với các lập trình viên và khách hàng để đáp ứng các yêu cầu, mục tiêu và chức năng mong muốn của dự án.</li>
          <li>Phát triển và tích hợp các chủ đề tùy chỉnh vào WordPress, PHP-Fusion và Concrete5.</li>
          <li>Tiến hành đào tạo cho khách hàng về cách xử lý hệ thống quản lý nội dung trang web.</li>
        </ul>
      </div>`,
    },
    {
      id: "education",
      title: "Học vấn",
      icon: "education",
      content: "",
    },
    {
      id: "skills",
      title: "Kỹ năng",
      icon: "skills",
      content: `<div>
        <div class="mb-2 font-semibold">KỸ NĂNG CHUYÊN MÔN</div>
        <ul class="list-disc pl-5 space-y-1">
          <li>Có kiến thức vững về về JavaScript</li>
          <li>Làm việc tốt với HTML, CSS, Javascripts và GitLab, Node js</li>
          <li>Thành thạo SQL, noSQL</li>
          <li>Có kiến thức về Framework Vuejs, Angular, React</li>
          <li>Có kỹ năng lập trình NET, lập trình C++</li>
          <li>Phân tích và thiết kế hệ thống</li>
          <li>Lập trình hướng đối tượng</li>
          <li>Setup, bảo trì hệ thống chạy Microsoft Windows</li>
        </ul>
      </div>`,
    },
  ]

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    const { active, over } = event

    if (over && over.id === "cv-drop-area") {
      const section = sectionTypes.find((section) => section.id === active.id)
      if (section) {
        onAddSection(section)
      }
    }
  }

  function renderSectionIcon(icon: string) {
    switch (icon) {
      case "user":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        )
      case "contact":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3z" />
            <path d="M6 6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2H6z" />
          </svg>
        )
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        )
      case "target":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        )
      case "briefcase":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        )
      case "education":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        )
      case "skills":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        )
      default:
        return null
    }
  }

  function renderSectionItem(section: (typeof sectionTypes)[0]) {
    return (
      <div className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50 text-left cursor-grab">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
            {renderSectionIcon(section.icon)}
          </div>
          <span>{section.title}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-emerald-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Thêm mục</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-gray-700 mb-2">Mục chưa sử dụng</h4>
        <p className="text-sm text-gray-500 mb-4">Kéo và thả mục bất kỳ vào vị trí bạn muốn thêm trên CV</p>

        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="space-y-2">
            {sectionTypes.map((section) => (
              <div key={section.id} id={section.id} draggable>
                {renderSectionItem(section)}
              </div>
            ))}
          </div>

          <div id="cv-drop-area" className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <p className="text-gray-500">Kéo các mục vào đây để thêm vào CV</p>
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="opacity-80">
                {renderSectionItem(sectionTypes.find((section) => section.id === activeId)!)}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <div>
        <h4 className="text-gray-700 mb-2">Mục đã sử dụng</h4>
        <p className="text-sm text-gray-500">Click để xem vị trí của mục trên CV</p>
      </div>
    </div>
  )
}
