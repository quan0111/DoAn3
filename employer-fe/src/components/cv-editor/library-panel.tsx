"use client"

import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LibraryPanelProps {
  onClose: () => void
}

export function LibraryPanel({ onClose }: LibraryPanelProps) {
  const cvCategories = [
    {
      id: "business",
      name: "KINH DOANH/BÁN HÀNG",
      templates: [
        {
          id: "sales-1",
          name: "Nhân viên kinh doanh",
          thumbnail: "/placeholder.svg?height=297&width=210",
        },
        {
          id: "sales-2",
          name: "Bán hàng thời trang quốc tế",
          thumbnail: "/placeholder.svg?height=297&width=210",
        },
      ],
    },
    {
      id: "it",
      name: "CÔNG NGHỆ THÔNG TIN",
      templates: [
        {
          id: "dev-1",
          name: "Business Development Executive (Nhân viên phát triển kinh doanh)",
          thumbnail: "/placeholder.svg?height=297&width=210",
        },
        {
          id: "dev-2",
          name: "Sales Representative",
          thumbnail: "/placeholder.svg?height=297&width=210",
        },
      ],
    },
  ]

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Thư viện CV</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <Tabs defaultValue={cvCategories[0].id}>
        <TabsList className="mb-4 flex overflow-x-auto">
          {cvCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {cvCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-2 gap-4">
              {category.templates.map((template) => (
                <div key={template.id} className="mb-6">
                  <button className="w-full">
                    <div className="border rounded-md overflow-hidden">
                      <div className="aspect-[210/297]">
                        <img
                          src={template.thumbnail || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-center text-sm">{template.name}</div>
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
