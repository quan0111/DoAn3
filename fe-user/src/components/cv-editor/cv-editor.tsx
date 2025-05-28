"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { CVPreview } from "./cv-preview"
import { DesignPanel } from "./design-panel"
import { AddSectionPanel } from "./add-section-panel"
import { LayoutPanel } from "./layout-panel"
import { TemplatePanel } from "./template-panel"
import { LibraryPanel } from "./library-panel"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { X } from "lucide-react"
import { defaultSections } from "@/lib/default-data"
import type { CVSection, CVTemplate, ActivePanel, CVData } from "@/lib/types"
import { DndContext, DragOverlay } from "@dnd-kit/core"

export function CVEditor() {
  const [activePanel, setActivePanel] = useState<ActivePanel | null>(null)
  const [sections, setSections] = useState<CVSection[]>(defaultSections)
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>({
    id: "modern",
    name: "Hiện đại",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-modern",
    description: "Mẫu CV hiện đại phù hợp với nhiều ngành nghề sáng tạo.",
    category: "Hiện đại",
    industries: ["Công nghệ", "Thiết kế", "Truyền thông"],
  })

  const [showAlert, setShowAlert] = useState(true)
  const [cvData, setCvData] = useState<CVData>({
    fullName: "Quân Đào",
    jobTitle: "LẬP TRÌNH VIÊN",
    phone: "0123 456 789",
    email: "daoquan356@gmail.com",
    website: "be.net/tencuaban",
    location: "Quận X, Thành phố Y",
  })

  const handleAddSection = (section: CVSection) => {
    setSections([...sections, { ...section, id: `section-${Date.now()}` }])
    setActivePanel(null)
  }

  const handleUpdateSection = (id: string, content: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, content } : section)))
  }

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))
  }

  const handleMoveSection = (fromIndex: number, toIndex: number) => {
    const updatedSections = [...sections]
    const [movedSection] = updatedSections.splice(fromIndex, 1)
    updatedSections.splice(toIndex, 0, movedSection)
    setSections(updatedSections)
  }

  const handleUpdateCVData = (data: Partial<CVData>) => {
    setCvData({ ...cvData, ...data })
  }

  return (
    <DndContext>
      <div className="container mx-auto px-4 py-6">
        {showAlert && (
          <Alert className="mb-6 bg-green-50 border-green-100 text-green-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center w-lg">
                <span className="font-medium">Gợi ý:</span>
                <AlertTitle className="ml-2 w-lg">Bôi đen văn bản để chỉnh sửa cỡ chữ và định dạng!</AlertTitle>
              </div>
              <button onClick={() => setShowAlert(false)} className="text-green-600 hover:text-green-800">
                <X className="h-4 w-4" />
              </button>
            </div>
          </Alert>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
          </div>

          <div className="lg:col-span-9">
            <div className="relative">
              {activePanel === "design" && <DesignPanel onClose={() => setActivePanel(null)} />}

              {activePanel === "add-section" && (
                <AddSectionPanel onAddSection={handleAddSection} onClose={() => setActivePanel(null)} />
              )}

              {activePanel === "layout" && (
                <LayoutPanel
                  sections={sections}
                  onMoveSection={handleMoveSection}
                  onClose={() => setActivePanel(null)}
                />
              )}

              {activePanel === "template" && (
                <TemplatePanel
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                  onClose={() => setActivePanel(null)}
                />
              )}

              {activePanel === "library" && <LibraryPanel onClose={() => setActivePanel(null)} />}

              <CVPreview
                sections={sections}
                template={selectedTemplate}
                cvData={cvData}
                onUpdateSection={handleUpdateSection}
                onRemoveSection={handleRemoveSection}
                onUpdateCVData={handleUpdateCVData}
              />
            </div>
          </div>
        </div>
      </div>
      <DragOverlay />
    </DndContext>
  )
}
