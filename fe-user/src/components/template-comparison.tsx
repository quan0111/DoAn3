"use client"
import { X } from "lucide-react"
import type { CVTemplate } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface TemplateComparisonProps {
  selectedTemplates: CVTemplate[]
  onRemoveTemplate: (templateId: string) => void
  onSelectTemplate: (template: CVTemplate) => void
  onClose: () => void
}

export function TemplateComparison({
  selectedTemplates,
  onRemoveTemplate,
  onSelectTemplate,
  onClose,
}: TemplateComparisonProps) {
  if (selectedTemplates.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">So sánh mẫu CV ({selectedTemplates.length})</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-2">
          {selectedTemplates.map((template) => (
            <div key={template.id} className="flex-shrink-0 w-48">
              <div className="relative border rounded-md overflow-hidden">
                <button
                  onClick={() => onRemoveTemplate(template.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
                <div className="aspect-[210/297] w-full">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="font-medium text-sm">{template.name}</div>
                <Button
                  onClick={() => onSelectTemplate(template)}
                  className="mt-2 w-full text-xs py-1 h-auto"
                  size="sm"
                >
                  Chọn mẫu này
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
