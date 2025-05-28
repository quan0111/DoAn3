"use client"

import { X, Check } from "lucide-react"
import type { CVTemplate } from "@/lib/types"
import { templates } from "@/lib/templates"

interface TemplatePanelProps {
  selectedTemplate: CVTemplate
  onSelectTemplate: (template: CVTemplate) => void
  onClose: () => void
}

export function TemplatePanel({ selectedTemplate, onSelectTemplate, onClose }: TemplatePanelProps) {
  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Mẫu CV</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="mb-6">
            <button onClick={() => onSelectTemplate(template)} className="w-full">
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
                {selectedTemplate.id === template.id && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="mt-2 text-center font-medium">{template.name}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
