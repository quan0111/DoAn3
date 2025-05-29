"use client"

import { useState } from "react"
import { X, Check, Star, Plus } from "lucide-react"
import type { CVTemplate } from "@/lib/types"
import { templates } from "@/lib/templates"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TemplatePanelProps {
  selectedTemplate: CVTemplate
  onSelectTemplate: (template: CVTemplate) => void
  onAddToComparison: (template: CVTemplate) => void
  comparisonTemplates: CVTemplate[]
  onClose: () => void
}

export function TemplatePanel({
  selectedTemplate,
  onSelectTemplate,
  onAddToComparison,
  comparisonTemplates,
  onClose,
}: TemplatePanelProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "simple", name: "Đơn giản" },
    { id: "professional", name: "Chuyên nghiệp" },
    { id: "creative", name: "Sáng tạo" },
    { id: "business", name: "Kinh doanh" },
    { id: "it", name: "Công nghệ" },
  ]

  const filteredTemplates = templates
    .filter((template) => activeCategory === "all" || template.category === activeCategory)
    .filter(
      (template) =>
        searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const isInComparison = (templateId: string) => {
    return comparisonTemplates.some((t) => t.id === templateId)
  }

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Mẫu CV</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm mẫu CV..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="mb-4 flex overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="mb-6">
            <div
              className={`relative border-2 rounded-md overflow-hidden ${
                selectedTemplate.id === template.id ? "border-emerald-500" : "border-gray-200"
              }`}
            >
              <div className="aspect-[210/297]">
                <img
                  src={template.thumbnail || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {template.isPremium && (
                <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                  Premium
                </div>
              )}
              {template.isPopular && !template.isPremium && (
                <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Phổ biến
                </div>
              )}
              {selectedTemplate.id === template.id && (
                <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <div className="absolute bottom-2 right-2">
                <button
                  onClick={() => onAddToComparison(template)}
                  disabled={isInComparison(template.id)}
                  className={`p-1 rounded-full ${
                    isInComparison(template.id)
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium">{template.name}</div>
              <div className="text-xs text-gray-500 mb-2">{template.description}</div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => onSelectTemplate(template)}
                  variant="default"
                  size="sm"
                  className="flex-1 text-xs py-1 h-8"
                >
                  Chọn
                </Button>
                <Button
                  onClick={() => onAddToComparison(template)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs py-1 h-8"
                  disabled={isInComparison(template.id)}
                >
                  So sánh
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
