"use client"

import type { Template } from "@/lib/types"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({ templates, selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm text-gray-500 mb-2">Chọn mẫu CV</h3>
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`relative border-2 rounded-md overflow-hidden ${
              selectedTemplate.id === template.id ? "border-emerald-500" : "border-gray-200"
            }`}
          >
            <div className="aspect-[210/297] bg-gray-100">
              <img
                src={template.thumbnail || "/placeholder.svg"}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-center font-medium">{template.name}</div>
            {selectedTemplate.id === template.id && (
              <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full">
                <Check className="h-4 w-4" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
