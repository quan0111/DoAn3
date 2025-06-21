"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { CVPreview } from "./cv-preview";
import { DesignPanel } from "./design-panel";
import { AddSectionPanel } from "./add-section-panel";
import { LayoutPanel } from "./layout-panel";
import { TemplatePanel } from "./template-panel";
import { LibraryPanel } from "./library-panel";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import type { CVSection, CVTemplate, ActivePanel, CVData } from "@/lib/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";

interface CVEditorProps {
  htmlContent: string;
  cssContent: string;
  onUpdateHtml: (html: string) => void;
  onUpdateCss: (css: string) => void;
}

export function CVEditor({ htmlContent: initialHtmlContent, cssContent: initialCssContent, onUpdateHtml, onUpdateCss }: CVEditorProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel | null>(null);
  const [editableHtml, setEditableHtml] = useState<string>(initialHtmlContent);
  const [cssContent, setCssContent] = useState<string>(initialCssContent); // Thêm state cho cssContent
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>({
    id: "modern",
    name: "Hiện đại",
    thumbnail: "/placeholder.svg?height=297&width=210",
    className: "template-modern",
    description: "Mẫu CV hiện đại phù hợp với nhiều ngành nghề sáng tạo.",
    category: "Hiện đại",
    industries: ["Công nghệ", "Thiết kế", "Truyền thông"],
  });
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setEditableHtml(initialHtmlContent);
    setCssContent(initialCssContent); // Cập nhật cssContent khi prop thay đổi
  }, [initialHtmlContent, initialCssContent]);

  // Cập nhật customStyles khi cssContent thay đổi
  useEffect(() => {
    if (initialCssContent) {
      setSelectedTemplate((prev) => ({ ...prev, customStyles: initialCssContent }));
    }
  }, [initialCssContent]);

  return (
    <DndContext>
      <div className="container mx-auto px-4 py-6">
        {showAlert && (
          <Alert className="mb-6 bg-green-50 border-green-100 text-green-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium">Gợi ý:</span>
                <AlertTitle className="ml-2">Bôi đen văn bản để chỉnh sửa cỡ chữ và định dạng!</AlertTitle>
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
                <AddSectionPanel onAddSection={() => {}} onClose={() => setActivePanel(null)} />
              )}
              {activePanel === "layout" && (
                <LayoutPanel sections={[]} onMoveSection={() => {}} onClose={() => setActivePanel(null)} />
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
                htmlContent={editableHtml}
                cssContent={selectedTemplate.customStyles || cssContent} // Sử dụng cssContent từ state
                onUpdateHtml={onUpdateHtml}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>
      <DragOverlay />
    </DndContext>
  );
}