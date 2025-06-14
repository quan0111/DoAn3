import type { CVTemplate } from "./types"

// Mẫu CV được lấy từ cơ sở dữ liệu
export const templates: CVTemplate[] = [
  {
    id: "thanh-dat",
    name: "Thành đạt",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-thanh-dat",
    description: "Mẫu CV chuyên nghiệp dành cho các vị trí quản lý và lãnh đạo",
    isPopular: true,
    isPremium: false,
    category: "business",
    industries: ["management", "finance", "marketing"],
  },
  {
    id: "toi-gian-2",
    name: "Tối giản 2",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-toi-gian-2",
    description: "Mẫu CV đơn giản, tập trung vào nội dung và dễ đọc",
    isPopular: true,
    isPremium: false,
    category: "simple",
    industries: ["it", "design", "education"],
  },
  {
    id: "tham-vong",
    name: "Tham vọng",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-tham-vong",
    description: "Mẫu CV nổi bật với thiết kế hiện đại và sáng tạo",
    isPopular: false,
    isPremium: true,
    category: "creative",
    industries: ["design", "marketing", "media"],
  },
  {
    id: "senior",
    name: "Senior",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-senior",
    description: "Mẫu CV dành cho các chuyên gia có nhiều năm kinh nghiệm",
    isPopular: false,
    isPremium: true,
    category: "professional",
    industries: ["it", "engineering", "consulting"],
  },
  {
    id: "fresh-graduate",
    name: "Fresh Graduate",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-fresh-graduate",
    description: "Mẫu CV dành cho sinh viên mới tốt nghiệp",
    isPopular: true,
    isPremium: false,
    category: "simple",
    industries: ["all"],
  },
  {
    id: "it-specialist",
    name: "IT Specialist",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-it-specialist",
    description: "Mẫu CV chuyên nghiệp dành cho ngành IT",
    isPopular: true,
    isPremium: false,
    category: "it",
    industries: ["it", "software", "data"],
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-creative-designer",
    description: "Mẫu CV sáng tạo dành cho designer",
    isPopular: false,
    isPremium: true,
    category: "creative",
    industries: ["design", "ui-ux", "media"],
  },
  {
    id: "marketing-pro",
    name: "Marketing Pro",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-marketing-pro",
    description: "Mẫu CV chuyên nghiệp dành cho ngành marketing",
    isPopular: false,
    isPremium: true,
    category: "business",
    industries: ["marketing", "sales", "pr"],
  },
]
